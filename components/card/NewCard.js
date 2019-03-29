import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { Container, Header, Content, Body, Title, Text, Form, Item, Input, Button, Toast } from 'native-base'
import { connect } from 'react-redux'
import * as ShortId from 'shortid'
import { NewCardAction } from '../../actions/CardActions'
import { saveCardToDeck } from '../../utils/storage'

class NewCard extends Component {
    state = {
        deck: null,
        question: '',
        answer: ''
    }

    componentDidMount(){
        const { navigation } = this.props
        const deckTitle = navigation.getParam('deckTitle', 'NO-ID')
        if(deckTitle && deckTitle !== 'NO-ID'){
            const deck = this.props.decks[deckTitle]
            this.updateDeck(deck)
        } else {
            Toast.show('Oops! Something went wrong. Please try again...')
        }
    }

    updateDeck(deck){
        this.setState({
            deck: deck
        })
    }

    onSubmit = () => {
        const { question, answer, deck } = this.state
        const cardId = ShortId.generate();
        Keyboard.dismiss()
        this.props.dispatch(NewCardAction(deck, {id: cardId, question: question, answer: answer}))
        saveCardToDeck({deckTitle: deck.title, card: {id: cardId, question: question, answer: answer}})
        Toast.show({text: 'Card saved!', type: 'success'})
        this.props.navigation.navigate('DeckDetail')
    }

    showToast = (msg) => {
        Toast.show({
            text: msg,
            type: 'danger'
        })
    }

    render(){
        const { question, answer, deck } = this.state
        return (
            <Container>
                <Content padder>
                    <Form>
                        <Item padder>
                            <Input
                                name="quest"
                                placeholder="Question..."
                                onChangeText={(value)=> this.setState({question: value})}
                                value={question}
                                />
                        </Item>
                        <Item padder>
                            <Input
                                name="ans"
                                placeholder="Answer..."
                                onChangeText={(value)=> this.setState({answer: value})}
                                value={answer}
                                />
                        </Item>
                    </Form>
                    <Button block style={{ margin: 15, marginTop: 50 }} onPress={() => {this.onSubmit()}}>
                        <Text>Submit</Text>
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

export default connect(mapStateToProps)(NewCard)