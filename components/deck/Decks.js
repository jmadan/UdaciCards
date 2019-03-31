import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FetchDecksAction, ClearDecksAction } from '../../actions/DeckActions'
import { Container, Header, Content, Text, Card, CardItem, Button, Body } from 'native-base';
import { FlatList } from 'react-native'

class Deck extends Component {

    componentDidMount(){
        this.props.dispatch(FetchDecksAction())
        // this.props.dispatch(ClearDecksAction())
    }

    render(){
        const { decks } = this.props;
        const deckList = decks ? Object.keys(decks).map(k => decks[k]) : null;

        if(deckList.length){
            return (
                <Container>
                    <Content>
                        <FlatList data={deckList} keyExtractor={item => item.id} renderItem={({item}) => 
                            <Card bordered>
                                <CardItem 
                                    header
                                    button
                                    style={{justifyContent: 'center'}}
                                    onPress={() => this.props.navigation.navigate('DeckDetail', {deckTitle: item.title})}>
                                        <Text>{item.title}</Text>
                                </CardItem>
                                <CardItem button onPress={() => this.props.navigation.navigate('DeckDetail',{deckTitle: item.title})}>
                                    <Body style={{height: 40, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text>
                                            {item.questions ? item.questions.length : 0 } Cards
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            }
                        />
                     </Content>
                </Container>
            )
        } else {
            return (
                <Container style={{justifyContent: 'center', alignItems: 'center'}}>    
                    <Content>
                        <Text style={{fontSize: 30, margin: 20}}>
                            No Decks Found...
                        </Text>
                    </Content>
                </Container>
            )
        }
    }
}

function mapStateToProps(store){
    return {
        decks: store.decks
    }
}

export default connect(mapStateToProps)(Deck)