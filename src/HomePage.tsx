import { useState } from 'react'
import type { PaginationResponse, UserResponse } from './types/UserResponse';
import { getUser } from './api/user';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import Search from 'antd/es/transfer/search';


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'City',
    dataIndex: 'city',
    key: 'city',
    render: (_: unknown, record: UserResponse) => record.address?.city || "-",
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    render: (_: unknown, record: UserResponse) => record.company?.name || "-",
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
  },
];



const HomePage = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    inquiry: "",
    sortField: "name",
    sortOrder: "ASC",
  });


  const { data, isLoading } = useQuery<PaginationResponse<UserResponse>>({
    queryKey: ['users', pagination.page, pagination.pageSize, pagination.inquiry, pagination.sortField, pagination.sortOrder],
    queryFn: async () => {
      const res = await getUser(pagination.pageSize, pagination.page, pagination.inquiry, pagination.sortField, pagination.sortOrder);
      return res.data;
    },
    keepPreviousData: true,
  });

  const onSearch = (value: string) => {
    console.log("search input:", value);
    setPagination(prev => ({
      ...prev,
      page: 1,
      inquiry: value
    }));
  };

  return (
    <div className='flex flex-col gap-4 w-full mx-4'>
      <div className='pt-2 w-3/12'>
        <Search placeholder="input search text"
          onChange={e => setPagination(prev => ({
            ...prev,
            inquiry: e.target.value,
            page: 1
          }))}
          onSearch={onSearch} enterButton />
      </div>
      {/* <Table loading={isLoading} dataSource={data?.data} columns={columns} /> */}
      <Table<UserResponse>
        rowKey="id"
        loading={isLoading}
        dataSource={data?.data}
        columns={columns}
        onChange={(pagination, filters, sorter) => {
          const sortField = Array.isArray(sorter) ? sorter[0]?.field : sorter.field;
          const sortOrder = Array.isArray(sorter) ? sorter[0]?.order : sorter.order;
          if (sortField) {
            setPagination(prev => ({
              ...prev,
              page: pagination.current ?? prev.page,
              pageSize: pagination.pageSize ?? prev.pageSize,
              sortField: sortField as string,
              sortOrder: sortOrder === "ascend" ? "asc" : sortOrder === "descend" ? "desc" : "",
            }));
          }

        }}
        pagination={{
          current: data?.paging.page,
          pageSize: data?.paging.pageSize,
          total: data?.paging.totalItem,
          showSizeChanger: true,
          onChange: (page, pageSize) => {
            setPagination(prev => ({
              ...prev,
              page,
              pageSize,
            }));
          },
        }
        }
      />
    </div>
  )
}

export default HomePage