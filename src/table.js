import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from 'antd';

const StudentTable=()=>{
    const[students, setStudents]=useState([
        {
            id: 1, 
            name: 'John Doe', 
            role: 'student', 
            contact: '1234567890',
            email:'123@gmail.com',
            city:'tuticorin'
        },
        {
            id: 2, 
            name: 'John Doe', 
            role: 'student', 
            contact: '1234567890',
            email:'123@gmail.com',
            city:'tuticorin'
        }
    ]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const columns=[
        // { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
        { title: 'Contact', dataIndex: 'contact', key: 'contact' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'City', dataIndex: 'city', key: 'city' },
        {
            title:'Action',
            key:'action',
            //record: Data associated with the current row in the table
            render:( record)=>(
                <Button type="link" onClick={()=>handleEdit(record)}>
                    Edit
                </Button>
            )
        }
    ]
    //edit button - edit a particular record in the table
    const handleEdit=(record)=>{
        form.setFieldsValue(record);
        setVisible(true);
    };
    //check whether user is adding new or editing existing student
    const handleOk=()=>{
        form.validateFields().then((values)=>{
            const updatedStudents = students.map((student) =>
        student.id === values.id ? values : student
            );
            if(values.id){
                setStudents(updatedStudents);
            }else{
                setStudents([...updatedStudents,{...values, id: Date.now()}])
            }
            setVisible(false);
        })
    }
    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
      };
      const showModal = () => {
        setVisible(true);
        form.resetFields();
    
      };
      return(
        <div>
            <Button type="primary" onClick={showModal}>
                Add Staff
            </Button>
            <Table dataSource={students} columns={columns}/>
            <Modal
            title="Edit Student"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            >
                <Form form={form} layout="vertical" name="studentForm">
                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
                     rules={[{ required: true, message: 'Please enter student name!' }]}
                    >
                       <Input />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        name="role"
                     rules={[{ required: true, message: 'Please enter the role!' }]}
                    >
                       <Input />
                    </Form.Item>
                    <Form.Item
                        label="Contact"
                        name="contact"
                     rules={[{ required: true, message: 'Please enter your phone number!' }]}
                    >
                       <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                     rules={[{ required: true, message: 'Please enter your email id!' }]}
                    >
                       <Input />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                     rules={[{ required: true, message: 'Please enter your city!' }]}
                    >
                       <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
      )
}
export default StudentTable;