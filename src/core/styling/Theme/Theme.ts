import {Coloring} from './Coloring';
import {Fonts} from './Fonts';
import {Adaptive} from './Adaptive';
import {Util} from './Util';

export interface Theme extends Adaptive, Coloring, Fonts, Util {}
