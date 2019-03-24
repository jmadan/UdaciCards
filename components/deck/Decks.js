import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FetchDecksAction, ClearDecksAction } from '../../actions/DeckActions'
import { Container, Header, Content, Text, Card, CardItem, Button, Body } from 'native-base';
import { FlatList } from 'react-native'

class Deck extends Component {
    state = {
        decks: null
    }

    componentDidMount(){
        this.props.dispatch(FetchDecksAction())
        // this.props.dispatch(ClearDecksAction())
    }

    componentDidUpdate(prevProps) {
        const { decks } = this.props;
        console.log('updated decks: ', decks)
        if(decks && decks !== prevProps.decks)
        {
            this.updateState(decks)
        };
    }

    updateState(decks){
        this.setState({
            decks: decks
        })
    }

    render(){
        const { decks } = this.state;
        

        const deckList = decks ? Object.keys(decks).map(k => decks[k]) : null;
        console.log('decks render ----------- ',deckList)

        if(deckList){
            return (
                <Container>
                    <Content>
                    <FlatList data={deckList} keyExtractor={item => item.id} renderItem={({item}) => 
                         <Card bordered >
                             <CardItem 
                                header
                                bordered
                                button
                                onPress={() => this.props.navigation.navigate('DeckDetail', {deckId: item.id})}>
                                 <Text>{item.title}</Text>
                             </CardItem>
                             <CardItem bordered button onPress={() => this.props.navigation.navigate('DeckDetail',{deckId: item.id})}>
                                <Body style={{height: 80, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>
                                        {item.cards ? Object.keys(item.cards).length : 0 } Cards
                                    </Text>
                                </Body>
                            </CardItem>
                         </Card>}
                     />
                     </Content>
                </Container>
            )
        } else {
            return (
                <Container>    
                    <Content>
                        <Text>
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