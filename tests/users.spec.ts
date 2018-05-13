import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import 'mocha';
import { User } from '../src/models/user';

var user:User;
describe('Pagevalidating', () =>{

    before(() => {

        chai.should();
        chai.use(chaiAsPromised);

    })

    beforeEach(() => {
        user = new User({
            userid:2,
            username:"testi",
            password:"null",
            firstname:"test",
            lastname:23,
            malic:"a"
        });
    })


    it('Should not have property malic', () =>{
      
        chai.expect(user).to.not.have.property('malic')

       })

    it('Generate query', () =>{
        return user.generateInsertQuery().catch(err => {
            console.log(err)
        })
        .then(result => {
            chai.expect(result).to.be.equal("INSERT INTO ocms_pages SET `username, firstname, lastname, password` = NULL")
        })

    })

});
