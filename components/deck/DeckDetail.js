import React, { Component } from 'react'
import { Container, Content, Text, Card, CardItem, Button, Body } from 'native-base'
import { connect } from 'react-redux'
import Spinner from '../Spinner'

class DeckDetail extends Component {

    state = {
        deck: null
    }

    componentDidMount(){
        const { navigation, decks } = this.props
        const deckId = navigation.getParam('deckId', 'NO-ID')
        const deck = decks[deckId]
        this.updateState(deck)
    }

    updateState(deck){
        this.setState({
            deck: deck
        })
    }
    render(){
        const { deck } = this.state
        const selectedDeck = deck
        
        const ele = selectedDeck ? 
            <Container>
                <Card bordered >
                    <CardItem header bordered>
                        <Text>{selectedDeck.title}</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>{selectedDeck.cards ? Object.keys(selectedDeck.cards).length : 0 } Cards</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button
                                block
                                primary
                                onPress={() => this.props.navigation.navigate('NewCard', { deckId: selectedDeck.id })}
                            >
                                <Text>Add Card</Text>
                            </Button>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button
                                block
                                success
                                onPress={() => this.props.navigation.navigate('Quiz', { deckId: selectedDeck.id })}
                            >
                                <Text>Start Quiz</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>
            </Container> : <Spinner />;
        return(
            ele
        )
    }

}

const mapStateToProps = (store) => {
    return {
        decks: store.decks
    }
}

export default connect(mapStateToProps)(DeckDetail);