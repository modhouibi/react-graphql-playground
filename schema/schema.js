const graphql=require('graphql');
const {GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLSchema}=graphql;
//const _=require('lodash');
const axios=require('axios');

const CompanyType=new GraphQLObjectType({
    name:'Company',
    fields:{
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        description:{type:GraphQLString}
    }

});

const UserType=new GraphQLObjectType({
    name:'User',
    fields:{
        id:{type:GraphQLString},
        firstName:{type:GraphQLString},
        age:{type:GraphQLInt},
        company:{type:CompanyType,
        resolve(parentValue,args){
           // console.log(parentValue,args)
           return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
           .then(resp=>resp.data);
        }
        }
    }
});

const RootQuery=new GraphQLObjectType({

    name:'RootQueryType',
    fields:{
        user:{
            type:UserType,
            args:{id:{type:GraphQLString}},
            resolve(parentValue,args){

               // return _.find(users,{id:args.id});
              return  axios.get(`http://localhost:3000/users/${args.id}`)
              .then(resp=>resp.data)
            }
        }


    }
});

module.exports=new GraphQLSchema({
    query:RootQuery
});