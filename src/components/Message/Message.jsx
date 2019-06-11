/* eslint-disable react/prop-types */
import React from 'react';
import { Bubble } from './Message.styled';

export default function Message(props) {
  return <Bubble right={props.right}>{props.message}</Bubble>;
}
