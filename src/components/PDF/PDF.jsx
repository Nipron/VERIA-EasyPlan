import React from 'react';
import { saveAs } from 'file-saver';
import {
    pdf,
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
    Svg,
    Path,
    LinearGradient,
    Stop,
    Defs, Image as PDFImage
} from '@react-pdf/renderer';
import s from "../Header/Header.module.css";
import veria from "../../img/forPDF/PDFheader.png";
import ReactFlagsSelect from "react-flags-select";
import {useSelector} from "react-redux";

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

const blobs = {
    list: {
        "mat5_55": 3,
        "mat4-55": 0,
        "mat3-55": 3,
        "mat2-55": 0,
        "mat5-100": 0,
        "mat4-100": 4,
        "mat3-100": 1,
        "mat2-100": 0,
        "cord2": 4,
        "cord1": 1,
        "cord025": 4,
        "kit100": 1,
        "kit55": 0
    }
}

const PDF3 = (image) => {

   // const stageImg = useSelector(state => state.stageImg);
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <PDFImage src={image}/>
                </View>
            </Page>
        </Document>
    );
};

export default PDF3;


/*export const generatePDFDocument = async () => {
    const blob = await pdf(
        <Document>
            <Page>// My document data</Page>
        </Document>
    ).toBlob();
    console.log(blob);
};*/

const b = 7;

const PdfDocument = (dat) => {
    return (
        <Document>
            <Page>
                <View>
                    <Text>
                        {dat}
                    </Text>
                </View>
            </Page>
        </Document>
            )
}

export const NewPDF = async (data) => {
    const blob = await pdf((
        <PdfDocument
            title='My PDF'
            pdfDocumentData={data}
        />
    )).toBlob();
    saveAs(blob, "gg");
}

