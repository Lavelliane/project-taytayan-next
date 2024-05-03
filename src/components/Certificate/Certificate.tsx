"use client";

import { fetchImageSize } from "@/utils/fetchImageSize";
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { PDFViewer } from "@react-pdf/renderer";
import { FaQuestion } from "react-icons/fa";

const Certificate = ({ uid, eventId }: { uid: string; eventId: string }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [certificateTemplate, setCertificateTemplate] = useState("");
  const [userName, setUserName] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState();
  const [validEventAndCert, setValidEventAndCert] = useState(false);

  const getImageSize = async (currentCertificateTemplate: string) => {
    const size = await fetchImageSize(currentCertificateTemplate);
    setImageSize(size || { width: 0, height: 0 });
  };

  useEffect(() => {
    const checkIfUserAttended = async () => {
      const docRef = doc(db, "trainings", eventId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const validUserandEvent = currentData.trainingRegistrants.some(
          (registrant: any) =>
            registrant.registrantId === uid && registrant.attended === true
        );
        if (validUserandEvent) {
          const userRef = doc(db, "users", uid);
          const userSnap = await getDoc(userRef);
          const currentUserData = userSnap.data();
          const date =
            currentData.trainingDate.toDate().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }) || "";
          setUserName(currentUserData?.firstName);
          setEventName(currentData.trainingName);
          setEventDate(date);
          setCertificateTemplate(currentData.certificateTemplate);
          getImageSize(currentData.certificateTemplate);
          setValidEventAndCert(true);
        } else {
          setValidEventAndCert(false);
        }
      } else {
        setValidEventAndCert(false);
      }
    };
    if (uid) {
      checkIfUserAttended();
    }
  }, [uid, eventId]);

  if (imageSize.width === 0 || imageSize.height === 0) {
    return null; // Render nothing until imageSize is fetched
  }

  const { width, height } = imageSize;
  const scaleFactor = Math.min(width, height) / 1500; // Adjust this factor as needed

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#ffffff",
    },
    wrapper: {
      flex: 1,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    textContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      textAlign: "center",
      fontSize: 48 * scaleFactor,
      fontWeight: "bold",
      color: "black",
    },
  });

  if (validEventAndCert) {
    return (
      <>
        <div className="h-screen px-28">
          <div className="h-full w-full flex flex-col items-center justify-center gap-3">
            <span className="font-semibold text-xl">
              ✨ Congratulations, {userName} for participating in {eventName}{" "}
              last {eventDate}! ✨
            </span>
            <PDFViewer width={"80%"} height={"90%"}>
              <Document>
                <Page size={[width, height]} style={styles.page}>
                  <View style={styles.wrapper}>
                    <Image src={certificateTemplate} style={styles.image} />
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>{userName}</Text>
                    </View>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </div>
        </div>
      </>
    );
  } else if (!validEventAndCert) {
    return (
      <>
        <div className="min-h-screen h-screen px-28">
          <div className="h-full w-full flex flex-col items-center justify-center gap-3">
            <FaQuestion />
            <span>{`You seem lost. I don't think this is the right event / certification :(`}</span>
          </div>
        </div>
      </>
    );
  }
};

export default Certificate;
