import React, { Component, Fragment } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Text, Header, Content, Button, Body, Card, CardItem } from 'native-base';
import { connect } from 'react-redux'
import { setLocalNotification, clearNotification } from '../../utils/notification'

class Quiz extends Component {

    state = {
        deck: null,
        correctQuestionsAnswered: 0,
        incorrectQuestionsAnswered: 0,
        numberOfCards: 0,
        currentCard: null,
        quizComplete: false,
        currentIndex: 0,
        cardKeys: null,
        flip: false
    }

    componentDidMount() {
        const { decks, navigation } = this.props
        const deckTitle = navigation.getParam('deckTitle', 'NO-ID')
        const deck = decks[deckTitle]
        this.updateState('deck', deck)
        const cardKeys = Object.keys(deck.questions)
        this.updateState('cardKeys', cardKeys)
        this.updateState('numberOfCards', cardKeys.length)
        if(cardKeys.length){
            this.updateState('currentIndex', 0)
            this.updateState('currentCard', deck.questions[cardKeys[0]])
        }
    }

    restartQuiz(){
        
        this.setState({
            correctQuestionsAnswered: 0,
            incorrectQuestionsAnswered: 0,
            quizComplete: false,
            currentIndex: 0,
            currentCard: this.state.deck.questions[this.state.cardKeys[0]],
            flip: false
        })
    }

    updateState(key, value){
        this.setState({
            [key]: value
        })
    }

    handleIndex(currentIndex, numberOfCards, deck, cardKeys){
        if(currentIndex >= numberOfCards-1) {
            this.setState({
                quizComplete: true,
            })
            clearNotification().then(setLocalNotification())
        } else {
            this.setState({
                currentCard: deck.questions[cardKeys[currentIndex + 1]]
            })
        }
    }

    correctAnswer(){
        const {
            currentIndex,
            numberOfCards,
            quizComplete,
            deck,
            cardKeys,
            correctQuestionsAnswered
        } = this.state

        if(currentIndex <= numberOfCards-1){
            this.setState({
                correctQuestionsAnswered: correctQuestionsAnswered + 1,
                currentIndex: currentIndex + 1,
                flip: false
            })
        }
        this.handleIndex(currentIndex, numberOfCards, deck, cardKeys)
    }

    incorrectAnswer(){
        const {
            currentIndex,
            numberOfCards,
            quizComplete,
            deck,
            cardKeys,
            incorrectQuestionsAnswered
        } = this.state

        if(currentIndex <= numberOfCards-1){
            this.setState({
                incorrectQuestionsAnswered: incorrectQuestionsAnswered + 1,
                currentIndex: currentIndex + 1,
                flip: false
            })
        }

        this.handleIndex(currentIndex, numberOfCards, deck, cardKeys)
    }

    render(){
        const { flip, currentCard, deck, quizComplete, correctQuestionsAnswered, numberOfCards, currentIndex } = this.state
        const ele = !flip ? 
                <Fragment>
                    <Text style={styles.flipText}>{currentCard ? currentCard.question : ''} {'\n'}</Text>
                    <Button success style={styles.btn} onPress={()=>{this.updateState('flip', true)}}>
                        <Text>Answer</Text>
                    </Button>
                </Fragment>
             : <Fragment>
                    <Text style={styles.flipText}>{currentCard ? currentCard.answer : ''}{'\n'}</Text>
                    <Button success style={styles.btn} onPress={()=>{this.updateState('flip', false)}}>
                        <Text>Question</Text>
                    </Button>
                </Fragment>

        return(
            <Container>
                <Header transparent>
                        <Text>{quizComplete ? 'Quiz Complete' : `${currentIndex + 1} / ${numberOfCards}`}</Text>
                </Header>
                <Card transparent>
                {!quizComplete
                ?
                    <CardItem bordered>
                        <Body bordered>
                            {ele}
                            <Button
                                block
                                success
                                onPress={()=> this.correctAnswer()}
                            >
                                <Text> Correct </Text>
                            </Button>
                            <Text>{'\n'}</Text>
                            <Button
                                block
                                danger
                                onPress={()=>{this.incorrectAnswer()}}
                            >
                                <Text> Incorrect </Text>
                            </Button>
                            </Body>
                        </CardItem>
                : 
                <CardItem>
                <Body>
                        <Text style={styles.result}>You scored: {parseInt((correctQuestionsAnswered/numberOfCards) * 100)}% </Text>
                        <Button
                        block
                        onPress={()=> this.restartQuiz()}
                    >
                        <Text> Restart Quiz </Text>
                    </Button>
                    <Text>{'\n'}</Text>
                    <Button
                        block
                        onPress={()=> this.props.navigation.goBack()}
                    >
                        <Text> Back to Deck </Text>
                    </Button>
                    </Body>
                    </CardItem>
                }
                </Card>
            </Container>
        )
    }

}

const mapStateToProps = (store) => {
    return {
        decks: store.decks
    }
}

const styles = StyleSheet.create({
    flipText: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 15
      },
    btn: {
        margin: 10,
        alignSelf: 'center'
    },
    result: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'green',
        margin: 15,
        alignSelf: 'center'
    }
  });

export default connect(mapStateToProps)(Quiz);