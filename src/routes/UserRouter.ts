import { Router } from 'express'
import { UserController } from '../controllers'
import { validateToken } from '../middlewares'

const router = Router()

router.get('/:userId', validateToken, UserController.getUser)
// router.get('/:userId/followers')
// router.get('/:userId/followees')
router.get('/:userId/blogs', validateToken, UserController.getUserBlogs)

// router.post('/login/google')
// router.post('/:userId/follow')

// 개발을 위한 local 에서 사용 될 회원가입, 로그인 API
router.post('/signup', UserController.signUp)
router.post('/login', UserController.logIn)

export default router
