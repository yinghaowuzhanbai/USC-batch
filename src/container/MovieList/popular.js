import React from "react";
import './style.css'
import store from '../../utils/actionCreator.js';
import {useState, useEffect} from "react";
import MovieListContainer from './display';
import { isContentEditable } from "@testing-library/user-event/dist/utils";

const initialData = {
  page: 0,
  content: ''
}
export default function Popular({fetchB}) {
  return <p>hello</p>
}
