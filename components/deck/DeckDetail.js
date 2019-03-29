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
        const deckTitle = navigation.getParam('deckTitle', 'NO-ID')
        const deck = decks[deckTitle]
        this.updateState(deck)
    }

    componentDidUpdate(prevProps){
        const { decks } = this.props
        const { deck } = this.state
        const prevDeck = prevProps.decks[deck.title]
        if(!('questions' in prevDeck) && decks[deck.title].questions){
            this.updateState(decks[deck.title])
        }
        if(('questions' in prevDeck) && Object.keys(prevDeck.questions).length !== Object.keys(decks[deck.title].questions).length){
            this.updateState(decks[deck.title])
        }
    }

    updateState(deck){
        this.setState({
            deck: deck
        })
    }
    render(){
        const { deck } = this.state
        
        const ele = deck ? 
            <Container>
                <Card bordered >
                    <CardItem header style={{justifyContent: 'center'}}>
                        <Text>{deck.title}</Text>
                    </CardItem>
                    <CardItem style={{justifyContent: 'center'}}>
                        <Text>{deck.questions ? Object.keys(deck.questions).length : 0 } Cards</Text>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Button
                                block
                                primary
                                onPress={() => this.props.navigation.navigate('NewCard', { deckTitle: deck.title })}
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
                                disabled={deck.questions && Object.keys(deck.questions).length ? false : true}
                                onPress={() => this.props.navigation.navigate('Quiz', { deckTitle: deck.title })}
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