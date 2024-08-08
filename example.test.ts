import { expect, test, describe, vi, Mocked } from "vitest"
import { testFn, request } from "./utils"
import axios from "axios"
vi.mock("axios")
//callback
//类型断言 解决被mock后的axios方法缺失的问题
const mockedAxios = axios as Mocked<typeof axios>
//mock
describe("function", () => {
  test("create a mock function", () => {
    const callback = vi.fn()
    testFn(12, callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(12)
  })
  //监控对象上的方法
  test("spy on method", () => {
    const obj = {
      getName: () => 1,
    }

    const spy = vi.spyOn(obj, "getName")
    obj.getName()

    expect(spy).toHaveBeenCalled()

    obj.getName()
    expect(spy).toBeCalledTimes(2)
  })

  test("mock third party module", async () => {
    // mockedAxios.get.mockImplementation(() => Promise.resolve({ data: 123 }))
    mockedAxios.get.mockResolvedValue({ data: 123 })
    const result = await request()
    expect(result).toBe(123)
  })
})
