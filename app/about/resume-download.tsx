"use client";

import { config } from "@/config";
import { EXPERIENCE } from "./data";
import {
  pdf,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    flexDirection: "column",
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
  },
  header: {
    fontSize: 18,
    marginBottom: 5,
    color: "#000000",
    fontWeight: 800,
    fontFamily: "Helvetica-Bold",
  },
  description: {
    fontSize: 9,
    marginBottom: 20,
    color: "#000000",
  },
  link: {
    color: "#000000",
  },
  section: {
    marginTop: 10,
    flexGrow: 1,
  },
  subsection: {
    marginBottom: 10,
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
  },
  expTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  expTitleLink: {
    color: "#000000",
  },
  date: {
    color: "#666666",
    fontSize: 9,
    marginBottom: 3,
  },
  content: {
    fontSize: 9,
    lineHeight: 1.5,
    margin: 0,
    padding: 0,
  },
});

const Resume = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{config.name}</Text>
      <Text style={styles.description}>
        {config.description} —{" "}
        <Link style={styles.link} src={config.domain}>
          {config.domain}
        </Link>
      </Text>
      <View style={styles.section}>
        <Text style={styles.title}>Experience</Text>
        {EXPERIENCE.map((exp) => {
          return (
            <View key={exp.title} style={styles.subsection}>
              <Text style={styles.date}>{exp.date}</Text>
              <Text style={styles.expTitle}>
                {exp.title} —{" "}
                <Link style={styles.expTitleLink} src={exp.atUrl}>
                  {exp.at}
                </Link>
              </Text>
              <Text style={styles.content}>{exp.desc}</Text>
            </View>
          );
        })}
      </View>
    </Page>
  </Document>
);

const downloadPdfDocument = async () => {
  const safeName = config.name.replace(/\s/g, "-").toLowerCase();
  const fileName = `${safeName}-resume.pdf`;
  const blob = await pdf(<Resume />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
};

export const ResumeDownloadButton = () => {
  return (
    <Button onClick={downloadPdfDocument} variant="outline">
      Download resume
    </Button>
  );
};
