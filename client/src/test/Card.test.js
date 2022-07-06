import Card from '../Componentes/card';
import { shallow } from 'enzyme'

Enzyme.configure({adapter: new Adapter()});

describe('card',()=>{
    it("should have a h3",()=>{
        const wrapper = shallow(<Card/>)
        const h3 = wrapper.find('h3')
        expect(h3.text).toBe('healthScore: ')
        
    })
    it("should have a Link",()=>{
        const wrapper = shallow(<Card/>)
        const button = wrapper.find('Link')
        expect(button.text).toBe('Diets: ')
        
    })
})
