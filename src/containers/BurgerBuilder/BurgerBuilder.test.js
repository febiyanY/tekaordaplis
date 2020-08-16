import {BurgerBuilder} from './BurgerBuilder'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

describe('<BurgerBuilder />', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onLoadIngredient={() => {}} />)
    })

    it('should render buildControls when ingredients is true', () => {
        wrapper.setProps({ingredients : {salad : 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
    
})