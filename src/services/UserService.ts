import prisma from '../prisma'
import { createUserInput, userUniqueSearchInput } from '../interfaces/User'

const createUser = (data: createUserInput) => {
  const { nth, batch_type_id, ...userInput } = data

  return prisma.users.create({
    data: {
      batches: {
        connectOrCreate: {
          where: { nth },
          create: { nth, batch_type_id, is_page_opened: false },
        },
      },
      ...userInput,
    },
    include: { batches: { include: { batch_types: true } } },
  })
}

const findMe = (data: userUniqueSearchInput) => {
  const [uniqueKey] = Object.keys(data)

  return prisma.users.findUnique({
    where: { [uniqueKey]: data[uniqueKey] },
    select: {
      id: true,
      name: true,
      thumbnail: true,
      blog_address: true,
      gmail: true,
      batch_id: true,
      batches: {
        select: {
          batch_types: true
        }
      }
    }
  })
}

const findUser = (data: userUniqueSearchInput) => {
  const [uniqueKey] = Object.keys(data)

  return prisma.users.findUnique({
    where: { [uniqueKey]: data[uniqueKey] },
    select: {
      name: true,
      thumbnail: true,
      blog_address: true,
      batch_id: true,
      batches: {
        select: {
          batch_types: true
        }
      }
    }
  })
}

const findUserBlogs = (data: userUniqueSearchInput) => {
  const [uniqueKey] = Object.keys(data)

  return prisma.users.findUnique({
    where: { [uniqueKey]: data[uniqueKey] },
    select: {
      name: true,
      thumbnail: true,
      batch_id: true,
      batches: {
        select: {
          batch_types: true
        }
      },
      blogs: {
        select: {
          id: true,
          title: true,
          subtitle: true,
          link: true,
          thumbnail: true,
          written_date: true,
        }
      }
    }
  })
}

export default {
  createUser,
  findMe,
  findUser,
  findUserBlogs
}
