import React from 'react';
import {PDFDownloadLink, Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 20,
        padding: 20
    },
    section: {
        flexGrow: 1
    }
});

const ToggleOrderDetails = (props) => {
    var currentPlans = props.plans.filter(plan => {
        return (props.currentOrder.plans.map(current => current.plan_id).includes(plan.id)
        )
    });

    if (currentPlans) {
        return (
            currentPlans.map((plan, i) =>
                <View key={plan.id}>
                    <View>
                        <Text style={{backgroundColor: "tomato", width:'100vw', display:'block'}} >Nom du plan : {plan.name}{"\n"}</Text>
                    </View>
                    <Text>Quantité : {props.currentOrder.plans[i].quantity}{"\n"}</Text>
                    <Text>Prix : {props.currentOrder.plans[i].price}{"\n"}</Text>
                    <Text>Pièce(s){"\n"}</Text>
                    {plan.pieces.map((piece, i) =>
                        <View key={piece.id + ' ' + plan.id + ' ' + i} className={"piece-container"} style={{border:"solid blue 1px", margin: '5px'}}>
                            <Text style={{backgroundColor: 'blue'}}> Nom : {piece.name}{"\n"}</Text>
                            <Text>Quantité :{piece.quantity}{"\n"}</Text>
                            <Text>Prix unitaire : {piece.unit_price} €{"\n"}
                            </Text>
                        </View>
                    )}
                </View>
            )
        );
    }
    return false;
};


const MyDoc = (props) => (
    <Document>

        <Page size="A4" style={styles.page}>
            <View>
                <View>
                    <Text style={{fontSize:'1.7cm', textAlign: 'center'}}>
                        ALPHAPAR - Facture
                    </Text>
                </View>
                <Text>Créée le : {props.invoice.created_at}</Text>
                <Text>Payée le : {props.invoice.paid_at}</Text>
                {
                    props.orders ? props.orders.map(order => {
                        return (
                            props.orderId === order.id ? <Text key={order.id} style={{marginTop: '20px'}}>
                                <Text>Commande : {order.id}{"\n"}</Text>
                                <Text>Créer le : {order.created_at}{"\n"}</Text>
                                <ToggleOrderDetails plans={props.plans} currentOrder={order}/>
                            </Text> : null

                        )
                    }) : null
                }
            </View>

        </Page>
    </Document>
);


function Test(props) {
    return (
        <div className="App">
            <PDFDownloadLink document={<MyDoc invoice={props.invoice} orders={props.orders} plans={props.plans}
                                              orderId={props.orderId}/>}
                             fileName="exportFacture.pdf"
                             className={"btn-basic btn-basic-sm my-3"}>
                {({blob, url, loading, error}) => (loading ? 'Loading document...' : 'Exporter la facture en PDF')}
            </PDFDownloadLink>
        </div>
    );
}

export default Test;
