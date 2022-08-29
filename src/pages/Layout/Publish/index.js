import { useSearchParams } from 'react-router-dom'
import { Card, Breadcrumb, Form, Input, Button, Select, Radio, Upload, message } from 'antd'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useSotre from '@/store'
import { observer } from 'mobx-react-lite'
import uuid from 'react-uuid'
import { PlusOutlined } from '@ant-design/icons'
import Editor from '@/components/Editor'
const { Option } = Select

function Pubilsh () {
  // 获取跳转进来的id
  const [params] = useSearchParams()
  const id = params.get('id')

  // mobx
  const { publishStore } = useSotre()

  // 提交Form表单
  const onFinish = (values) => {
    console.log('values', values)
  }
  // 获取频道数据
  useEffect(() => {
    publishStore.getChannelList()
  }, [])

  // 封面选择
  const [isUpload, setIsUpload] = useState(true)
  const radioChange = (value) => {
    const num = value.target.value
    setUoloadMaxCount(num)
    if (num === 1) setUploadFileList([picList[0]])
    if (num === 3) setUploadFileList(picList)
    if (num > 0) {
      setIsUpload(true)
    } else {
      setIsUpload(false)
    }
  }

  // 图片上传
  const [uploadFileList, setUploadFileList] = useState([])
  const handleFileChange = (files) => {
    console.log('files', files)
    const { file, fileList } = files
    cachePic(file)
    setUploadFileList(fileList)


  }

  const beforeUpload = (file) => {
    const isLegalType = file.type === "image/jpeg" || "image/png"
    if (!isLegalType) {
      message.error('只允许上传png或jpg类型图片')
      return Upload.LIST_IGNORE
    }
    const isLegalSize = file.size / 1024 / 1024 < 1
    if (!isLegalSize) {
      message.error('图片大小超过1M')
      return Upload.LIST_IGNORE
    }
    return true
  }
  // 上传图片最大数量
  const [uoloadMaxCount, setUoloadMaxCount] = useState(1)
  // 缓存图片
  const [picList, setPicList] = useState([])
  function cachePic (pic) {
    if (pic.status === 'done') {
      if (picList.length >= 3) {
        picList.shift()
      }
      picList.push(pic)
      setPicList(picList)
    }
  }

  // 编辑器
  const [editorValue, setEditorValue] = useState('')
  const editorChange = (value) => {
    setEditorValue(value)
    form.setFieldsValue({
      content: value
    })
  }

  const [form] = Form.useForm()


  return (
    <Card
      title={
        <>
          <Breadcrumb separator='/'>
            <Breadcrumb.Item>
              <Link to='/'>首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              文章发布
            </Breadcrumb.Item>
          </Breadcrumb>
        </>
      }
    >
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        initialValues={{
          type: 1,
          content: ''
        }}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[
            {
              required: true,
              message: '请输入标题！',
            },
          ]}
        >
          <Input style={{ width: 400 }} />
        </Form.Item>
        <Form.Item
          label="频道"
          name="channel_id"
          rules={[
            {
              required: true,
              message: '请选择文章频道！',
            },
          ]}
        >
          <Select placeholder="请选择文章频道" style={{ width: 400 }}>
            {publishStore.channelList.map(item => (
              <Option key={uuid()} value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="封面">
          <Form.Item name="type" >
            <Radio.Group onChange={radioChange}>
              <Radio value={1}>一图</Radio>
              <Radio value={3}>三图</Radio>
              <Radio value={0}>无图</Radio>
            </Radio.Group>

          </Form.Item>
          {isUpload &&
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              action="http://geek.itheima.net/v1_0/upload"
              showUploadList
              fileList={uploadFileList}
              onChange={handleFileChange}
              beforeUpload={beforeUpload}
              maxCount={uoloadMaxCount}
              multiple
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          }
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '请输入文章内容' }]}
        >
          <Editor editorChange={(value) => editorChange(value)} editorValue={editorValue} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </Card>
  )

}

export default observer(Pubilsh)