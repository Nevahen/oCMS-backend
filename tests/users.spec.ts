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
            malic:"a"
        });
    })


    it('Should be rejected, too short title', () =>{
        console.log(user)
       return user;
    });


})
