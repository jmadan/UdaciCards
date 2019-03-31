import React, { Component } from 'react'
import { Container, Content, Text, Card, CardItem, Button, Body } from 'native-base'
import { connect } from 'react-redux'
import DeckActions from '../../actions/DeckActions'
import Spinner from '../Spinner'
import DeckDetailsView from './DeckDetailsView'

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

    componentWillReceiveProps(nextProps) {
        const { navigation } = this.props
        const { decks } = nextProps
        const deckTitle = navigation.getParam('deckTitle', 'NO-ID')
        const deck = decks[deckTitle]
        this.updateState(deck)
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
                    <DeckDetailsView questions={deck.questions} title={deck.title} />
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
                                disabled={deck.questions && deck.questions.length ? false : true}
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