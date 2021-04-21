import React from 'react';
import {Document, Image, Page, StyleSheet, View} from "@react-pdf/renderer";
import veria from "../../img/forPDF/PDFheader.png";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 20,
        padding: 20,
        flexGrow: 1
    }
});

const NewPDF = () => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image src={veria}/>
                </View>
            </Page>
        </Document>
    );
};

export default NewPDF;
