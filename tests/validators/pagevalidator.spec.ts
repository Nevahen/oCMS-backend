import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import 'mocha';
import { PageValidator } from '../../src/_shared/pagevalidator';

const pages = require('./pagedata');
var validator:PageValidator;
describe('Pagevalidating', () =>{

    before(() => {

        chai.should();
        chai.use(chaiAsPromised);

    })

    beforeEach(() => {
        validator = new PageValidator();
    })


    it('Should be rejected, too short title', () =>{
       return validator.validate(pages[0]).should.eventually.be.rejected;
    });

    it('should pass', () =>{
        return validator.validate(pages[1])
        .then(result =>{
            chai.expect(result).to.have.property("title",12345);
        })
     });
})
