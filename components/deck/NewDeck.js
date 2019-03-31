import React, { Component } from 'react'
import { Container, Header, Content, Body, Title, Text, Form, Item, Input, Button, Toast } from 'native-base'
import { Keyboard } from 'react-native';
import { connect } from 'react-redux'
import { NewDeckAction } from '../../actions/DeckActions';
import * as ShortId from 'shortid'

class NewDeck extends Component {
    state = {
        title: ''
    }

    onValueChange(value) {
        this.setState({
          title: value
        });
      }

    onSubmit = () => {
        const { decks } = this.props

        const ifExists = decks && Object.keys(decks).findIndex(k => k === this.state.title)
        if(ifExists === -1 || !ifExists){
            Keyboard.dismiss()
            const deckId = ShortId.generate();
            this.props.dispatch(NewDeckAction({id: deckId, title: this.state.title}))
            Toast.show({text: 'Deck saved!', type: 'success'})
            this.setState({title: ''})
            this.props.navigation.navigate('DeckDetail',{deckTitle: this.state.title})
        } else {
            this.showToast('Deck with this title already exists!')
        }
        
    }

    showToast = (msg) => {
        Toast.show({
            text: msg,
            type: 'danger'
        })
    }

    render(){
        const { title } = this.state
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>
                            What is the title of your new deck?
                        </Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Item padder>
                            <Input
                                placeholder="Deck Title"
                                onChangeText={this.onValueChange.bind(this)}
                                value={title}
                                />
                        </Item>
                    </Form>
                    <Button disabled={title ? false : true} block style={{ margin: 15, marginTop: 50 }} onPress={() => {this.onSubmit()}}>
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

export default connect(mapStateToProps)(NewDeck)