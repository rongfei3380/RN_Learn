import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import PropTypes from 'prop-types';

import {
    requireNativeComponent,
} from 'react-native';


let iface = {
    name: "KenBurnsView",
    propTypes: {
        imgSource: PropTypes.string,
        ...View.propTypes
    },
};
module.exports = requireNativeComponent("KenBurnsView", iface);
