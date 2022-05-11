Webpack 버전으로 인한 polyfills 에러<br>

강의링크 : https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B8%B0%EB%B3%B8/lecture/37094?tab=community&mm=null&q=65992<br>

polyfills란? : https://jforj.tistory.com/210

오류 해결하는데 있어서 참고 : https://velog.io/@jaewoneee/Webpack <br>

![어질어질한 에러들](https://user-images.githubusercontent.com/81299056/166904687-d3c5da0f-3e54-49c7-a396-e581f3d7470c.png)<br>

저기 오류에 뜨는것들 중에 <br>

can't resolve '' 에다가 밑에 add a fallback~에 install까지 하라고 되어있는 것 들은 <br>

**node_modules/react-scripts/config/webpack.config.js**에 들어가서 쭉 내리다보면<br>

```javascript
resolve:{
  ~,
  fallback:{
  }
}
```
라고 되어있는데 여기서 fallback 안에 오류중 ```add a fallback``` 쪽의 내용을 넣어주고 <br>

```npm install --save ""``` 를 통해 해당 모듈을 설치한다<br>

만약 ```Module not found: Error: Can’t resolve ‘fs’ ``` 와 같이 install 말이 딱히 없는 오류같은 경우는 <br>

똑같이 **node_modules/react-scripts/config/webpack.config.js**에 들어가서 <br>

```fallback```안에 해당하는 내용을 ```false``` 해주면 된다. <br>

ex)

![해결방안](https://user-images.githubusercontent.com/81299056/166906491-e7cc06ce-7ba4-4481-8f82-c949f90bb6db.png)

