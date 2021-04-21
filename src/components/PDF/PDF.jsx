import React from 'react';
import {Page, Text, View, Document, StyleSheet, Image, Svg, Path, LinearGradient, Stop, Defs } from '@react-pdf/renderer';
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

const PDF = (props) => {
   const stageImg = useSelector(state => state.stageImg);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image src={stageImg}/>
                </View>
            </Page>
        </Document>
    );
};

export default PDF;


