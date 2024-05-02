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

const Certificate = ({ uid, eventId }: { uid: string; eventId: string }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [certificateTemplate, setCertificateTemplate] = useState("");
  const [validEventAndCert, setValidEventAndCert] = useState(false);

  const getImageSize = async (currentCertificateTemplate: string) => {
    const size = await fetchImageSize(currentCertificateTemplate);
    setImageSize(size);
  };

  useEffect(() => {
    const checkIfUserAttended = async () => {
      const docRef = doc(db, "trainings", eventId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const currentData = docSnap.data();
        const validUserandEvent = currentData.trainingRegistrants.some(
          (registrant) =>
            registrant.registrantId === uid && registrant.attended === true
        );
        if (validUserandEvent) {
          setCertificateTemplate(currentData.certificateTemplate);
          getImageSize(currentData.certificateTemplate);
          setValidEventAndCert(true);
        }
        setValidEventAndCert(false);
      } else {
        setValidEventAndCert(false);
      }
    };
    if (uid) {
      checkIfUserAttended();
    }
  }, [uid]);

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
      color: "white",
    },
  });

  if (validEventAndCert) {
    return (
      <Document>
        <Page size={[width, height]} style={styles.page}>
          <View style={styles.wrapper}>
            <Image src={certificateTemplate} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Test</Text>
            </View>
          </View>
        </Page>
      </Document>
    );
  } else {
    <span>ERROR HERE</span>;
  }
};

export default Certificate;
