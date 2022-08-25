import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Row,
  Select,
  DatePicker,
  Table,
  Space,
  Tag,
  Popconfirm
} from 'antd'
import React from 'react'
import useSotre from '@/store'
import { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import uuid from 'react-uuid'
import { useNavigate } from 'react-router-dom'
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
    value: -1,
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

const App = () => {
  const { articleStore } = useSotre()

  useEffect(() => {
    articleStore.getChannelList()
  }, [articleStore])

  const [params, setParams] = useState({
    page: 1,
    per_page: 10
  })
  const onFinish = (values) => {
    const { status, channel, date } = values
    const _params = {}
    if (status) {
      _params.status = status
    }
    if (channel) {
      _params.channel = channel
    }
    if (date) {
      _params.begin_pubdate = date[0].format('YYYY-MM-DD')
      _params.end_pubdate = date[1].format('YYYY-MM-DD')
    }
    console.log('_params', _params)
    setParams({
      ...params,
      ..._params
    })
  }

  useEffect(() => {
    articleStore.getArticleDataList(params)
  }, [params])


  const formatStatus = (type) => {
    return type === 1 ? <Tag color="red">审核失败</Tag> : <Tag color="green">审核通过</Tag>
  }
  const handleTypeChange = (value) => {
    console.log('handleTypeChange', value)
  }


  const navigate = useNavigate()
  const goPublish = (data) => {
    console.log('---', data)
    navigate(`/publish?id=${data.id}`)
  }

  const pageChange = (page, pageSize) => {
    console.log(page, pageSize)
    setParams({
      ...params,
      page,
      per_page: pageSize
    })
  }
  const confirm = async (id) => {
    await articleStore.delAtrticleById(id)
    await articleStore.getArticleDataList()
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
    {
      title: '状态',
      dataIndex: 'status',
      render: data => formatStatus(data)
    },
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
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">

            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => goPublish(data)} />
            <Popconfirm
              title="确定删除吗？"
              onConfirm={() => confirm(data.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>

          </Space>
        )
      },
      fixed: 'right'
    }
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
                  <Option key={uuid()} value={item.value}>
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
                  <Option key={uuid()} value={item.id}>
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
      <Table
        dataSource={articleStore.articleList}
        columns={columns} bordered
        rowKey={item => item.id}
        pagination={{
          total: articleStore.articleTotal,
          pageSizeOptions: ['5', '10', '15'],
          current: params.page,
          pageSize: params.per_page,
          onChange: pageChange,
          showSizeChanger: true,
        }}
      />
    </>

  )
}

export default observer(App)