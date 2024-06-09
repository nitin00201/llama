'use client'
import LlamaForm from "llama-forms-react";

const form =()=>{
  const login_test = (data) => {
    alert('successfully saved')
    console.log("login", data)
      
  }
  return (
    <>
    <LlamaForm
    schema={{
      title:"this is for registration form",
      description:"this is description",
      wizard:true,
      wizardOptions:{
        
    },
      progressBar: {
        show: true,
        color: "red",
        height: "10px",
        width: "95%",
        text: "",
        textAlign: "",
        textColor: "",
        subProgress: true,
        align: "",
      },
      buttons: {
        previous: {
          text: "Previous",
          loader: false,
        },
        next: {
          text: "Next",
          loader: true,
          
        },
        submit: {
          text: "Done",
          loader: true,
          
        },
      },
      initialStep: 1,
        properties: {
          question1: {
            type: 'string',
            required: true,
            enum: ["Yes","No"],
            step: 1,
          },
          question2: {
            type: 'string',
            required: true,
            enum: ["Yes","No"],
            step: 2,
          }, 
          question3: {
            type: 'string',
            required: true,
            enum: ["Yes","No"],
            step: 3,
          }, 
          question4: {
            type: 'string',
            required: true,
            enum: ["Yes","No"],
            step: 4,
          }, 
          question5: {
            type: 'string',
            required: true,
            enum: ["Yes","No"],
            step: 5,
          }, 
          question6: {
            type: 'string',
            required: true,
            enum: ["Yes","No"],
            step: 6,
          }, 
          question7: {
            type: 'string',
            required: true,
            enum: ["Yes","No"],
            step: 7,
          },
           question8: {
            type: 'string',
            required: true,
            enum: ["Yes","No"],
            step: 8,
          },
           question9: {
            type: 'string',
            required: true,
            enum: ["Yes","No"],
            step: 9,
          },
           question10: {
            type: 'string',
            required: true,
            enum: ["Yes","No"],
            step: 10,
          },
          
          
          
          
        }
    }}
    options={{
      fields: {
        question1: {
          type: "radio",
          label: "are you a demo 1",
          enum: ["Yes","No"],
          required: true,
          step:1
        },
        question2:{
          type: "radio",
          label:"are you a demo 2",
          enum:["yes","No"],
          required: true,
          step:2
        },
        question3:{
          type: "radio",
          label:"are you a demo 3",
          enum:["yes","No"],
          required: true,
          step:3
        },
        question4:{
          type: "radio",
          label:"are you a demo 4",
          enum:["yes","No"],
          required: true,
          step:4
        },
        question5:{
          type: "radio",
          label:"are you a demo 5",
          enum:["yes","No"],
          required: true,
          step:5
        },
        question6:{
          type: "radio",
          label:"are you a demo 6",
          enum:["yes","No"],
          required: true,
          step:6
        },
        question7:{
          type: "radio",
          label:"are you a demo 7",
          enum:["yes","No"],
          required: true,
          step:7
        },
        question8:{
          type: "radio",
          label:"are you a demo 8",
          enum:["yes","No"],
          required: true,
          step:8
        },
        question9:{
          type: "radio",
          label:"are you a demo 9",
          enum:["yes","No"],
          required: true,
          step:9
        },
        question10:{
          type: "radio",
          label:"are you a demo 10",
          enum:["yes","No"],
          required: true,
          step:10
        }
      }
    }
  }
  onSubmit={login_test}

    />
    
    </>
  )
}
export default form;