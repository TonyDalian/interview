# React
## React 的工作原理
React 会创建一个虚拟 DOM(virtual DOM)。当一个组件中的状态改变时，React 首先会通过 "diffing" 算法来标记虚拟 DOM 中的改变；
第二步是调节(reconciliation)，会用 diff 的结果来更新 DOM。
## react diff 原理
把树形结构按照层级分解，只比较同级元素。
给列表结构的每个单元添加唯一的 key 属性，方便比较。
React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）。
合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.
选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。
## 为什么虚拟 dom 会提高性能?
虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能。

用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。

然后用新的树和旧的树进行比较，记录两棵树差异把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了。
## react中setState是同步的还是异步？
1. setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
原生事件是指非react合成事件，原生自带的事件监听 addEventListener ，或者也可以用原生js、jq直接 document.querySelector().onclick 这种绑定事件的形式都属于原生事件。
2. setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
3. setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。
## setState() with prevState
```js
const incrementFive = () => {
    for (let i = 0; i < 5; i++) {
        setCount(prevCount => prevCount + 1)
    }
}
```
## React 中 keys 的作用
Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。
在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。
渲染同类型元素不带key只会产生性能问题，如果渲染的是不同类型的状态性组件，组件将会被替换，状态丢失
## 调用 setState 之后发生了什么
在代码中调用setState函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。
经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个UI界面。
在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。
在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。
## useState vs class state 
class state always an object, useState can be array, number, string
## Lifecycle Method
1. Mounting
constructor, static getDerivedStateFromProps, render and componentDidMount
P1 P2 P3 C1 C2 C3 C4 P4
2. Updating
static getDerivedStateFromProps, shouldComponentUpdate, render, getSnapshotBeforeUpdate and componentDidUpdate
order P-C-render-C-P
3. Unmounting
componentWillUnmount
4. Error Handling
static getDerivedStateFromError and componentDidCatch
## React Portal
```js
function PortalDemo() {
	return ReactDOM.createPortal(
		<h1>Portals Demo</h1>,
		document.getElementById('portal-root')
	)
}
```
## react-redux的实现原理
react-redux是一个轻量级的封装库，它主要通过两个核心方法实现：
Provider：从最外部封装了整个应用，并向connect模块传递store。
Connect： 
    1、包装原组件，将state和action通过props的方式传入到原组件内部。
    2、监听store tree变化，使其包装的原组件可以响应state变化
## Composition vs Inheritance
React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.
We recommend that such components use the special children prop to pass children elements directly into their output:
```js
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```
## Controlled Components vs Uncontrolled Components
In React, mutable state is typically kept in the state property of components, and only updated with setState().We can combine the two by making the React state be the “single source of truth”. 
To write an uncontrolled component, instead of writing an event handler for every state update, you can use a ref to get form values from the DOM.
## onClick
```js
  this.handleChange = this.handleChange.bind(this);
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  const handleClick = (e, flag) => {
    e.preventDefault();
  };
```
```html
<input type="text" value={this.state.value} onChange={this.handleChange} />
<input className="checkbox__link" href="" onClick={e => handleClick(e,flag)}>
```
## HOC higher-order component reusing component logic
##### a higher-order component is a function that takes a component and returns a new component. withRouter, Redux’s connect
https://ui.dev/react-higher-order-components/
A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.
HOCs use containers as part of their implementation. You can think of HOCs as parameterized container component definitions.
connect is a higher-order function that returns a higher-order component!
```js
// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```
1. A HOC should be a pure function with no side-effects. It should not make any modifications and just compose the original component by wrapping it in another component.
2. Do not use HOC’s in the render method of a component. Access the HOC outside the component definition.
3. Static methods must be copied over to still have access to them. A simple way to do this is the hoist-non-react-statics package.
4. Refs are not passed through.
https://blog.jakoblind.no/simple-explanation-of-higher-order-components-hoc/
```js
// Take in a component as argument WrappedComponent
function withNameReact(WrappedComponent) {
    // And return a new anonymous component
    return class extends React.Component{
        render(){
            return <WrappedComponent
                    name="React"
                    {...this.props} />;
        }
    }
}
const Hello = ({ name }) => <h1>Hello {name}!</h1>;
const HelloReact = withNameReact(Hello);
// No need to send in the name prop, it is already sent in
// by the HOC. It will output Hello React!
<HelloReact/>
```
HOC is a powerful concept that is used to enhance a component with new functions or data. It is worth noting the following:
1. We don’t modify or mutate the component. We create new ones.
2. A HOC is used to compose components for code reuse.
3. A HOC is a pure function. That means it has no side effects. It only returns a new component.
## useMemo useCallback
```js
function Button({ handleClick, children }) {
  console.log('Rendering button - ', children)
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  )
}

export default React.memo(Button)

function Counter() {
	const [counterOne, setCounterOne] = useState(0)
	const [counterTwo, setCounterTwo] = useState(0)

	const incrementOne = () => {
		setCounterOne(counterOne + 1)
	}

	const incrementTwo = () => {
		setCounterTwo(counterTwo + 1)
  }

  const isEven = useMemo(() => {
    let i = 0
    while (i < 2000000000) i++
    return counterOne % 2 === 0
  }, [counterOne])

	return (
		<div>
			<div>
        <button onClick={incrementOne}>Count One - {counterOne}</button>
        <span>{isEven ? 'Even' : 'Odd'}</span>
			</div>
			<div>
        <button onClick={incrementTwo}>Count Two - {counterTwo}</button>
			</div>
		</div>
	)
}

export default Counter

function ParentComponent() {
	const [age, setAge] = useState(25)
	const [salary, setSalary] = useState(50000)

	const incrementAge = useCallback(() => {
		setAge(age + 1)
	}, [age])

	const incrementSalary = useCallback(() => {
		setSalary(salary + 1000)
	}, [salary])

	return (
		<div>
			<Title />
			<Count text="Age" count={age} />
			<Button handleClick={incrementAge}>Increment Age</Button>
			<Count text="Salary" count={salary} />
			<Button handleClick={incrementSalary}>Increment Salary</Button>
		</div>
	)
}

export default ParentComponent
```
## Custom Hook
```js
function CounterTwo() {
	const [count, increment, decrement, reset] = useCounter(10, 10)

	return (
		<div>
			<h2>Count = {count}</h2>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
			<button onClick={reset}>Reset</button>
		</div>
	)
}

export default CounterTwo

function useCounter(initialCount = 0, value) {
	const [count, setCount] = useState(initialCount)

	const increment = () => {
		setCount(prevCount => prevCount + value)
	}

	const decrement = () => {
		setCount(prevCount => prevCount - value)
	}

	const reset = () => {
		setCount(initialCount)
	}
	return [count, increment, decrement, reset]
}

export default useCounter
```
## useImperativeHandle
useImperativeHandle customizes the instance value that is exposed to parent components when using ref. As always, imperative code using refs should be avoided in most cases. useImperativeHandle should be used with forwardRef:
```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

In this example, a parent component that renders <FancyInput ref={inputRef} /> would be able to call inputRef.current.focus().

useImperativeHandle customizes the instance value that is exposed to parent components when using ref. As always, imperative code using refs should be avoided in most cases. useImperativeHandle should be used with forwardRef:
```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```
In this example, a parent component that renders <FancyInput ref={inputRef} /> would be able to call inputRef.current.focus().
## useLayoutEffect
The signature is identical to useEffect, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render.
we recommend starting with useEffect first and only trying useLayoutEffect if that causes a problem.
## useDebugValue
useDebugValue can be used to display a label for custom hooks in React DevTools.
## Testing TDD
Statements
Branches
Functions
Lines

enzyme shallow, mount, simulate
redux-mock-store
testing-library/jest-dom
testing-library/user-event
## Storybook
storybook/preset-create-react-app


# Angular
## 8大组件 Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
## Binding
1. Interpolation{{}}
2. Property Binding []
3. Event Binding ()
4. Two-way Binding [()]
## Intercept proporty change 
1. split two-way binding
```js 
multiple property
ngOnChanges(change: SimpleChanges){}```
2. Getter Setter
## Output
##### child
```html
<form class="form" (ngSubmit)="onSubmit()">
  <input type="text" name="title" [(ngModel)]="title" placeholder="Add Todo...">
  <input type="submit" value="Submit" class="btn">
</form>
```
```js
onSubmit() {
    const todo = {
      title: this.title,
      completed: false
    }

    this.addTodo.emit(todo);
}
```
```js
 @Output() addTodo: EventEmitter<any> = new EventEmitter();
```
##### parent
```html
<app-add-todo (addTodo)="addTodo($event)"></app-add-todo>
<app-todo-item 
  *ngFor="let todo of todos" 
  [todo]="todo"
  (deleteTodo)="deleteTodo($event)"
  >
</app-todo-item>
```
```js
  addTodo(todo:Todo) {
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }
```
## Service
```js
  @Injectable({
    providedIn: 'root'
  })
  constructor(private http:HttpClient) { }
  // Get Todos
  getTodos():Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }
```
## <ng-template> ngTemplateOutlet <ng-container> <ng-content> Content Projection
As the name suggests the <ng-template> is a template element that Angular uses with structural directives (*ngIf, *ngFor, [ngSwitch] and custom directives).
```html
<!-- Mothod 1 -->
<ng-template [ng-if]="home">Go home!</ng-template>
<!-- Mothod 2 -->
<ng-template [ng-if]="home them goHome"></ng-template>
<ng-template #goHome>Go home!</ng-template>

<ng-container *ngFor="let item of items">
    <div *ngif="item.id">{{ item.name }}</div>
</ng-container>

<!-- project-content.html -->
<div class="heading">
   <ng-content select="h1"></ng-content>
</div>
<div class="body">
   <ng-content select="div"></ng-content>
</div>
<div class="footer">
   <ng-content></ng-content>
</div>
<project-content>
   <h1>Header for first ng-content</h1>
   <div>Div for first ng-content</div>
   <span>Span for first ng-content</span>
</project-content>
<!-- example 1--->
<div>
  <ng-container *ngTemplateOutlet="companyLogoTemplate"></ng-container>
  <h1>Company History</h1>
  <div>{{companyHistory}}</div>
</div>
<form (ngSubmit)="onSubmit()">
  <ng-container *ngTemplateOutlet="companyLogoTemplate"></ng-container>
</form>
<div class="footer">
  <ng-container *ngTemplateOutlet="companyLogoTemplate"></ng-container>
</div>

<ng-template #companyLogoTemplate>
  <div class="companyLogo">
    <img [src]="logoSourceUrl">
  </div>
</ng-template>
<!-- example 2--> 
<ng-template #customTabButtons>
    <div class="custom-class">
        <button class="tab-button" (click)="login()">
            {{loginText}}
        </button>
        <button class="tab-button" (click)="signUp()">
            {{signUpText}}
        </button>
    </div>
</ng-template>
<tab-container [headerTemplate]="customTabButtons"></tab-container>
```
```js
@Component({
  selector: 'tab-container',
  template: `
    <ng-template #defaultTabButtons>
      <div class="default-tab-buttons">
        ...
      </div>
    </ng-template>
    <ng-container *ngTemplateOutlet="headerTemplate || defaultTabButtons"></ng-container>
  `
})
export class TabContainerComponent {
    @Input() headerTemplate: TemplateRef<any>; // Custom template provided by parent
}
```
## Directive
1. Components—directives with a template. @Component
A component is a directive-with-a-template and the @Component decorator is actually a @Directive decorator extended with template-oriented features.
2. Structural directives—change the DOM layout by adding and removing DOM elements.
##### NgFor and NgIf
3. Attribute directives—change the appearance or behavior of an element, component, or another directive.
##### built-in NgStyle directive 
```html
<p appHighlight>Highlight me!</p>
```
```js
import { Directive, ElementRef, Input } from '@angular/core';
@Directive({ selector: '[myHighlight]' })
export class HighlightDirective {
    @HostListener('mouseenter') onMouseEnter() {
       this.highlight('yellow');
    }

    @HostListener('mouseleave') onMouseLeave() {
       this.highlight(null);
    }

    private highlight(color: string) {
       this.el.nativeElement.style.backgroundColor = color;
    }
    constructor(el: ElementRef) {
       el.nativeElement.style.backgroundColor = 'green';
    }
}
```
## interface
```js
@Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();
export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;
}
```
## interface vs class
a class is essentially an object factory (ie. a blueprint of what an object is supposed to look like and then implemented), whereas an interface is a structure used solely for type-checking.

While a class may have initialized properties and methods to help create objects, an interface essentially defines the properties and type an object can have.
```js
interface IPerson {
    firstName: string;
    lastName: string;
    age: number;
    getFullName(): string;
}
class Person implements IPerson {
    public firstName: string;
    public lastName: string;
    public age: number;
    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
}

const person: IPerson = new Person('John', 'Doe', 44);
```
## @ViewChild @ViewChildren
```js
@ViewChild('nameRef') nameElementRef: ElementRef;
@ViewChild(ChildComponent) childComponentRef: ChildComponent;

ngAfterViewInit() {
    this.childComponentRef.message = 'Message from parent component';
}
@ViewChild(StudentDetailComponent) studentDetail: StudentDetailComponent;
@ViewChildren(StudentDetailComponent) studentDetailList: QueryList<StudentDetailComponent>;
ngAfterViewInit(): void {
    setTimeout(() => {
        //this.studentDetail.student.name = 'Rajesh';
        this.studentDetailList.toArray().forEach((comp) => {
        comp.student.grade = 12;
        });
    }, 0);
}
@ContentChild(StudentHistoryComponent) studentHistory: StudentHistoryComponent;
@ContentChildren(StudentHistoryComponent) studentHistoryList: QueryList<StudentHistoryComponent>;

```
## Template Reference Variables
```html
<app-child #child [loggedIn]="userLoggedIn"></app-child>
<div>
  {{child.name}}
  <button (click)="child.greetVishwas()">Greet</button>
</div>
```
## Guard
```js
{
    path: 'special',
    canActivate: [AuthGuard],
    component: SpecialEventsComponent
},
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      console.log('true')
      return true
    } else {
      console.log('false')            
      this._router.navigate(['/login'])
      return false
    }
  }
}
```
## Intercepter
```js
    providers: [AuthService, AuthGuard, EventService, 
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptorService,
        multi: true
    }]
    @Injectable()
    export class TokenInterceptorService implements HttpInterceptor {
      constructor(private injector: Injector){}
        intercept(req, next) {
            let authService = this.injector.get(AuthService)
            let tokenizedReq = req.clone(
            {
                headers: req.headers.set('Authorization', 'bearer ' + authService.getToken())
            }
            )
            return next.handle(tokenizedReq)
        }
    }
```
## Angular中常见的生命周期的钩子函数?
ngOnChanges :当Angular设置其接收当前和上一个对象值的数据绑定属性时响应。
ngOnInit :在第一个ngOnChange触发器之后,初始化组件/指令。这是最常用的方法,用于从后端服务检索模板的数据。
ngDoCheck：检测并在Angular上下文发生变化时执行。每次更改检测运行时,会被调用。
ngOnDestroy:在Angular销毁指令/组件之前消除。取消订阅可观察的对象并脱离事件处理程序,以避免内存泄漏。
ngAfterContentInit:组件内容已初始化完成
ngAfterContentChecked:在Angular检查投影到其视图中的绑定的外部内容之后。
ngAfterViewInit:Angular创建组件的视图后。
ngAfterViewChecked：在Angular检查组件视图的绑定之后
## Angular中路由的工作原理
Angular应用程序具有路由器服务的单个实例,并且每当URL改变时,相应的路由就与路由配置数组
进行匹配。在成功匹配时,它会应用重定向,此时路由器会构建ActivatedRoute对象的树,
同时包含路由器的当前状态。在重定向之前,路由器将通过运行保护(CanActivate)
来检查是否允许新的状态。Route Guard只是路由器运行来检查路由授权的接口方法。
保护运行后,它将解析路由数据并通过将所需的组件实例化到
<router-outlet></router-outlet>
来激活路由器状态。
## 解释rjx在Angular中的使用场景
Rxjs是在微软所提供的一种的异步处理数据的方式,在Angular中处理网络通信时用到了。
创建一个Observable并subsribe
比如:this.http.get('').subscribe((data)=>{ })
## Animations
States
Void Default(*) Custom
```js
animation: [
  trigger('fade',[
      state('void', style({ opacity:0 })),
      transition(':enter, :leave', [
          animate(2000))
      ])
  ])
]
```

# Vue
<template>
<p v-if="error">{{ error }}</p>
<div v-for="(post, index) in posts"
     v-bind:item="posts"
     v-bind:index="index"
     v-bind:key="post._id"
>
{{ `${post.createdAt.getDate()}` }}
<input v-model="text">
<button v-on:click="createPost">
</div>
</template>
<script>
export default {
    name : "PostComponent",
    data() {
        return {
            posts: [],
            error: null
        }
    },
    async created() {
        this.posts = await PostService.getPosts();
    },
    methods: {
        async createPost() {
           await PostService.insertPosts();
        } 
    }
}
</script>

# Angular new feature
Angular 16新特性：
全新Reactivity模型的开发者预览，包括Angular Signals库和RXS互操作性。
服务器端渲染和hydration增强，可以重用现有DOM节点。
基于esbuild的全新Angular CLI构建器开发者预览版，显著缩短构建时间。
改进独立组件、指令和管道的工具，提供迁移图表和独立的迁移指南。
需要配合Node.js v16或v18以及TypeScript 4.9或更高版本使用。
移除了View Engine和ngcc，更新了Angular包格式（APF）。
Angular 17新特性：
可推迟视图（Deferrable views），提升性能和开发者体验。
新的块模板语法和内置控制流，提供更直观、更少的文档查找和更好的类型检查。
改进混合渲染体验，支持Firebase部署。
新的生命周期钩子afterRender和afterNextRender。
Angular性能优化：
使用OnPush策略，只在输入发生变化时重新渲染组件。
在*ngFor指令中使用trackBy函数，提高渲染效率。
使用Pure Pipes避免不必要的重新计算。
考虑使用异步pipe和zone.js处理复杂数据流和事件。
使用AOT编译提高页面加载速度。
使用Lazy Loading将组件分成多个部分，按需加载。
使用Web Workers在后台线程中执行复杂计算。
手动停止检测变化，使用ChangeDetectorRef.detach提高检测效率。
这些新特性和优化措施可以帮助开发者更好地利用Angular框架，提升应用性能和开发效率。

在HTML中，<script>标签的async和defer属性都用于控制脚本的异步加载，但它们在执行时机和顺序上有所不同：
表格
async defer
![image](https://github.com/user-attachments/assets/3ca72b27-e03e-4244-a4f0-856609abe58b)

加载方式 异步加载，与HTML解析同时进行 异步加载，与HTML解析同时进行
执行顺序 不保证按照它们在页面中的出现顺序执行 按照它们在HTML文档中的顺序依次执行
执行时机 一旦脚本加载完成，就会立即执行，可能会在HTML解析完成之前或过程中执行 脚本会在HTML文档解析完毕后执行，在DOMContentLoaded事件触发之前
适用场景 独立、不依赖于其他脚本或DOM内容的脚本，如分析工具或广告脚本 依赖于DOM结构的脚本，因为保证了脚本执行时DOM已经完全加载完成

二、AngularJS中directive的配置
在AngularJS中，directive（指令）的配置选项非常灵活，以下是一些常见的配置选项：
restrict: 定义指令的声明方式，如元素（E）、属性（A）、类（C）或注释（M）。
template/templateUrl: 定义指令的HTML模板，可以是内联的HTML代码或外部文件的路径。
scope: 定义指令的隔离作用域，可以是一个新的作用域对象、一个布尔值（表示是否继承父作用域）或特殊值（如{}表示隔离作用域但不继承父作用域的属性）。
link: 一个链接函数，用于定义指令的行为，它可以访问DOM元素、作用域和属性等。
controller: 定义指令的控制器，用于封装指令的业务逻辑。
require: 指定指令所依赖的其他指令的控制器，可以是字符串（表示指令名）或数组（表示多个指令名）。
transclude: 允许指令将内容从其所在的位置“转移”到模板中的指定位置。

三、Angular的SSR（服务端渲染）
Angular的SSR（服务端渲染）是一种技术，可以在服务器上生成Angular应用的HTML内容，然后将其发送到客户端。这种方法提高了应用的首屏加载速度，并改善了SEO（搜索引擎优化）。
基本过程：Angular应用在服务器上执行，将应用的视图转换为HTML字符串，然后将其发送到浏览器。
实现方式：通常通过Angular Universal来实现，这是Angular的官方库，提供了为Angular应用程序生成服务端渲染的能力。
使用步骤：
安装Angular Universal和必要的依赖项。
创建一个服务端的入口文件（如server.ts），并配置Express服务器。
创建一个服务端的应用模块（如app.server.module.ts），用于引导Angular应用的服务端渲染。
构建客户端和服务端的代码，并将它们放在dist文件夹中。
启动Express服务器，运行Angular应用。
优化建议：
使用缓存来存储SSR的输出，以减少服务器负载。
使用懒加载模块减少初始加载时所需的代码量。
确保使用适当的meta标签和其他SEO优化技术，以便搜索引擎能够有效索引内容。
综上所述，async和defer在脚本加载和执行上有不同的行为，directive的配置选项提供了丰富的灵活性来定义指令的行为和结构，而SSR则是提升Angular应用性能和SEO友好性的重要技术。

Angular性能优化是一个复杂而重要的过程，它涉及多个方面和策略。以下是一些关键的Angular性能优化技巧：

1. 优化变更检测
使用OnPush策略：对于不需要频繁检查变更的组件，可以使用ChangeDetectionStrategy.OnPush策略。这可以减少变更检测周期数，从而提高性能。
分离变化检测器：使用ChangeDetectorRef.detach()暂时分离变化检测器，并仅在必要时重新连接。这可以避免不必要的变更检测。
2. 延迟加载和代码分割
懒加载模块：利用Angular的路由模块实现懒加载功能，只在用户访问特定页面时才加载相关组件及其依赖项。这有助于减少初始加载时间，提升用户体验。
代码分割：将大型代码库分割成更小的块，以便浏览器可以更快地下载和解析它们。
3. 提前编译
AOT编译：在构建过程中使用AOT（Ahead-Of-Time）编译，可以预编译应用程序，从而加快浏览器中的渲染速度。
4. 摇树优化和死代码消除
Tree Shaking：从应用程序包中删除未使用的代码，从而减小其大小。
死代码消除：确保在生产构建中删除所有不必要的代码。
5. 捆绑和压缩
捆绑优化：将多个文件捆绑成一个文件，以减少HTTP请求的数量。
压缩：使用GZIP或其他压缩算法来减小传输文件的大小。
6. 高效组件设计
避免冗余组件：仔细审查组件树，移除任何不必要的或重复的组件。
合理划分组件层次：确保每个组件都有明确的责任范围，避免创建过于庞大的“超级组件”。
限制DOM元素：减少DOM元素的数量并尽可能使用轻量级元素。
7. 虚拟DOM和分批更新
使用虚拟DOM库：虽然Angular本身不支持虚拟DOM，但可以考虑引入第三方库来处理大量数据的列表渲染问题。
分批更新：当需要进行一系列DOM更新时，尽可能将它们合并成一次操作。
8. 图片优化
压缩图片：使用工具如TinyPNG或ImageOptim等来压缩图片文件大小。
采用现代图片格式：使用WebP等新型图片格式来提供更好的压缩率。
懒加载图片：仅在图片进入视口时才开始加载，以减少初始页面加载所需的资源量。
9. 使用服务工作器和PWA
服务工作器：使用服务工作器来缓存资产和API响应，提高应用的加载速度和性能。
PWA（渐进式Web应用）：将Angular应用转变为PWA，以提高性能，尤其是在移动设备上。
10. 监控和性能分析
使用性能监控工具：如Angular DevTools等，这些工具可以帮助开发者深入了解应用程序的运行状态，并找出潜在的性能问题。
定期分析性能：通过定期检查关键性能指标（如首次内容绘制时间FCP、最大内容绘制时间LCP、交互时间TTI和累积布局偏移CLS），及时发现并解决性能问题。
综上所述，Angular性能优化需要结合多种策略来解决应用程序生命周期的不同方面。通过优化变更检测、使用延迟加载、AOT编译、高效组件设计和其他技术，可以显著提高Angular应用程序的性能和用户体验。
![image](https://github.com/user-attachments/assets/90e78c85-83d2-47e9-bd25-22f277e6a655)
![image](https://github.com/user-attachments/assets/c925b4c8-636d-4a20-a568-f167de31cb49)
![image](https://github.com/user-attachments/assets/9491a371-723a-4eb3-a3e8-263bb6699991)
![image](https://github.com/user-attachments/assets/87630f36-0929-4260-ab83-b31f9076c261)






        
