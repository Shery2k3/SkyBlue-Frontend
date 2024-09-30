import React from "react";
import {
  Page,
  Document,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import LogoAccent from "/Logos/LogoAccent.png";

Font.register({
  family: "Helvetica-Bold",
  src: "https://cdnjs.cloudflare.com/ajax/libs/pdfkit/0.8.3/font/Helvetica-Bold.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingLeft: 10,
    paddingRight: 10,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 75,
    height: "auto",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
  },
  reportTitle: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    fontWeight: "bold",
    textAlign: "left",
    flexGrow: 1,
  },  
});

const OrderSheet = ({ category, products }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} src={LogoAccent} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>OrderSheet</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderSheet;
