import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  DatePicker,
  Table,
  Space
} from 'antd'
import React from 'react'
import useSotre from '@/store'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'

const { Option } = Select
const { RangePicker } = DatePicker
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const typeList = [
  {
    value: null,
    name: '全部',
    id: -1
  },
  {
    value: 0,
    name: '草稿',
    id: 0
  },
  {
    value: 1,
    name: '待审批',
    id: 1
  },
  {
    value: 2,
    name: '审核通过',
    id: 2
  },
  {
    value: 3,
    name: '审核失败',
    id: 3
  },
]
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
]


const App = () => {
  const { articleStore } = useSotre()
  useEffect(() => {
    articleStore.getChannelList()
  }, [articleStore])
  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })
  useEffect(() => {
    articleStore.getArticleDataList(params)
  }, [params])
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  const handleTypeChange = (value) => {
    console.log('handleTypeChange', value)
  }

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover?.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   render: data => formatStatus(data)
    // },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    // {
    //   title: '操作',
    //   render: data => {
    //     return (
    //       <Space size="middle">
    //         <Button
    //           type="primary"
    //           shape="circle"
    //           icon={<EditOutlined />}
    //           onClick={() => goPublish(data)} />
    //         <Button
    //           type="primary"
    //           danger
    //           shape="circle"
    //           icon={<DeleteOutlined />}
    //           onClick={() => delArticle(data)}
    //         />
    //       </Space>
    //     )
    //   },
    //   fixed: 'right'
    // }
  ]


  return (
    <>
      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
          channel: 0,
          status: 2
        }}
      >
        <Row>
          <Col span={8}>
            <Form.Item label="状态" name='status'>
              <Select onChange={handleTypeChange}>
                {typeList.map(item => (
                  <Option key={item.id} value={item.value}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="频道" name="channel">
              <Select onChange={handleTypeChange}>
                {articleStore.channelList.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="日期" name="date">
              <RangePicker />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
            筛选
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={articleStore.articleList} columns={columns} bordered />
    </>

  )
}

export default observer(App)