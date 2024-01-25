import React, { useState, useEffect } from "react";
import { CategoryBadge } from "../Trainings/CategoryBadge";
import { CategoryDropdown } from "../Trainings/CategoryDropdown";
import { MyTrainingCard } from "../Trainings/MyTrainingCard";
import { NetworkingEvent } from "@/types/types";

import { SortDropdown } from "@/components/Trainings/SortDropdown";
import { AddEventButton } from "./AddEventButton";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useAuthStore } from "@/hooks/useAuth";
import { db } from "@/lib/firebase";

const NetworkingPage = () => {
  const defaultSelectedCategories = [
    "technical",
    "certification",
    "personal",
    "professional",
    "vocational & arts",
    "other",
  ]; // Define defaults

  const userStore = useAuthStore((state) => state.user);
  const [networkingEvents, setNetworkingEvents] = useState<NetworkingEvent[]>(
    []
  );
  const [sortOption, setSortOption] = useState<string>("alphabetical"); // Default sorting option
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    defaultSelectedCategories
  ); // Initialize
  const [filteredEvents, setFilteredEvents] = useState<any[]>(networkingEvents);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(networkingEvents);
  }, [networkingEvents]);

  useEffect(() => {
    sortEvents(sortOption);
  }, [sortOption]);

  const fetchEvents = async () => {
    try {
      let userEvents: String[] = [];

      if (userStore.role === "training_center") {
        // TODO: What is the equivalent of this in event_hosting?
        userEvents = userStore.myTrainings;
      } else if (userStore.role === "general") {
        userEvents = userStore.eventsJoined;
      }

      const eventsRef = query(
        collection(db, "networking"),
        where("eventId", "in", userEvents)
      );
      const eventsDoc = await getDocs(eventsRef);

      if (userStore.eventsJoined.length > 0) {
        const fetchedEvents: NetworkingEvent[] = [];

        eventsDoc.forEach((doc) => {
          const eventData: NetworkingEvent = {
            ...(doc.data() as NetworkingEvent),
          };
          fetchedEvents.push(eventData);
        });
        setNetworkingEvents(fetchedEvents);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption);
    sortEvents(newSortOption);
  };

  const sortEvents = (option: string) => {
    let sortedEvents: any[] = [...filteredEvents];

    switch (option) {
      case "alphabetical":
        sortedEvents.sort((a, b) =>
          a.trainingName.localeCompare(b.trainingName)
        );
        break;
      case "date":
        sortedEvents.sort((a, b) => b.trainingDate - a.trainingDate);
        break;
      case "registrants":
        sortedEvents.sort(
          (a, b) =>
            b.trainingRegistrants?.length - a.trainingRegistrants?.length
        );
        break;
      default:
        break;
    }

    setFilteredEvents(sortedEvents);
  };

  const handleCategoryChange = (newSelectedCategories: string[]) => {
    setSelectedCategories(newSelectedCategories);
  };

  const filterEvents = () => {
    if (selectedCategories.length > 0) {
      setFilteredEvents(
        networkingEvents.filter((event) =>
          selectedCategories.includes(event.eventCategory)
        )
      );
    } else {
      setFilteredEvents(networkingEvents);
    }
  };

  return (
    <main className="flex flex-col w-full px-4 md:px-8 lg:px-12 xl:px-24">
      <section className="py-8">
        <h1 className="font-inter font-semibold pb-4 text-lg text-dark">
          My Events
        </h1>
        <div>
          <div className="pb-8">
            <div className="flex gap-6 justify-between">
              <div className="flex gap-6">
                <CategoryDropdown
                  selectedCategories={selectedCategories}
                  onCategoryChange={handleCategoryChange}
                />
                <SortDropdown onSortChange={handleSortChange} />
              </div>
              <AddEventButton />
            </div>
            <div className="flex flex-wrap gap-2 pt-4 ">
              {selectedCategories
                .slice()
                .sort((a, b) => a.localeCompare(b))
                .map((category, index) => (
                  <CategoryBadge key={index} category={category} />
                ))}
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full pb-8">
            {/* {filteredEvents.map((event, index) => (
							<MyTrainingCard key={training.trainingId + '_' + index} trainingData={training} />
						))} */}
            {/* TODO: Create MyEventCard */}
          </div>
          {networkingEvents.length === 0 && (
            <h1 className="text-center font-semibold">No events created</h1>
          )}
        </div>
      </section>
    </main>
  );
};

export default NetworkingPage;
