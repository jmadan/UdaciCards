import React, { Fragment } from 'react'
import { Container, Content, Text, Card, CardItem } from 'native-base'


const DeckViewDetails = ({ title, questions }) => (
    <Fragment>
        <CardItem header style={{justifyContent: 'center'}}>
            <Text>{title}</Text>
        </CardItem>
        <CardItem style={{justifyContent: 'center'}}>
            <Text>{questions
                    ? questions.length === 1
                      ?`${questions.length} Card`
                      : `${questions.length} Cards`
                    : 'No cards available'
                }
          </Text>
        </CardItem>
    </Fragment>
  );

  export default DeckViewDetails;