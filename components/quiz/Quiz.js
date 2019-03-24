import React, { Component } from 'react'
import { Container, Text, Header, Content, Button, Card, CardItem } from 'native-base';
import { connect } from 'react-redux'


class Quiz extends Component {

    state = {
        deck: null,
        correctQuestionsAnswered: 0,
        incorrectQuestionsAnswered: 0,
        cardKeys: null,
        currentCard: null,
        quizComplete: false
    }

    componentDidMount() {
        const { decks, navigation } = this.props
        const deckId = navigation.getParam('deckId', 'NO-ID')
        console.log(JSON.stringify(decks), deckId)
        const deck = decks[deckId]
        this.updateState('deck', deck)
        const cardKeys = Object.keys(deck.cards)
        this.updateState('cardKeys', cardKeys)
        if(cardKeys.length){
            this.updateState('currentCard', deck.cards[cardKeys[0]])
        }

    }

    updateState(key, value){
        this.setState({
            [key]: value
        })
    }

    render(){
        const { cardKeys, currentCard, deck, quizComplete } = this.state
        console.log(JSON.stringify(deck))
        console.log(JSON.stringify(cardKeys), JSON.stringify(currentCard))

        const ele = currentCard && !quizComplete ? <Text>{currentCard.question}</Text> : <Text>You have completed the quiz</Text>

        return(
            <Container>
                <Header>
                    <Text>Quiz</Text>
                </Header>
                <Content>
                    <Card>
                        <CardItem>
                            {ele}
                        </CardItem>
                        <CardItem>
                            <Text>Answer</Text>
                        </CardItem>
                    </Card>
                    <Button
                        block
                        success
                        onPress={()=>{}}
                    >
                        <Text>Correct</Text>
                    </Button>
                    <Button
                        block
                        danger
                        onPress={()=>{}}
                    >
                        <Text>Incorrect</Text>
                    </Button>
                </Content>
            </Container>
        )
    }

}

const mapStateToProps = (store) => {
    return {
        decks: store.decks
    }
}

export default connect(mapStateToProps)(Quiz);