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

# Springboot
## 什么是SpringBoot？
用来简化spring应用的初始搭建以及开发过程，使用特定的方式来进行配置（properties或yml文件）创建独立的spring引用程序 main方法运行，嵌入的Tomcat 无需部署war文件，简化maven配置，自动配置spring添加对应功能starter自动化配置。
## Spring Boot、Spring MVC 和 Spring 有什么区别？
1、SpringSpring最重要的特征是依赖注入。所有 SpringModules 不是依赖注入就是 IOC 控制反转。当我们恰当的使用 DI 或者是 IOC 的时候，我们可以开发松耦合应用。松耦合应用的单元测试可以很容易的进行。
2、Spring MVC提供了一种分离式的方法来开发 Web 应用。通过运用像DispatcherServelet，MoudlAndView 和ViewResolver 等一些简单的概念，开发 Web 应用将会变的非常简单。
3、Spring 和 SpringMVC 的问题在于需要配置大量的参数。
4、Spring Boot 通过一个自动配置和启动的项来目解决这个问题。为了更快的构建产品就绪应用程序，Spring Boot 提供了一些非功能性特征。
## Spring Boot 的核心注解是哪个？它主要由哪几个注解组成的？
1、@SpringBootConfiguration：组合了 @Configuration 注解，实现配置文件的功能。
2、@EnableAutoConfiguration：打开自动配置的功能，也可以关闭某个自动配置的选项，如关闭数据源自动配置功能。
3、@ComponentScan：Spring组件扫描。
## 什么是 JavaConfig？
1、面向对象的配置。由于配置被定义为 JavaConfig 中的类，因此用户可以充分利用 Java 中的面向对象功能。一个配置类可以继承另一个，重写它的@Bean 方法等。
2、减少或消除 XML 配置。基于依赖注入原则的外化配置的好处已被证明。但是，许多开发人员不希望在 XML 和 Java 之间来回切换。JavaConfig 为开发人员提供了一种纯 Java 方法来配置与 XML 配置概念相似的 Spring 容器。从技术角度来讲，只使用 JavaConfig 配置类来配置容器是可行的，但实际上很多人认为将JavaConfig 与 XML 混合匹配是理想的。
3、类型安全和重构友好。JavaConfig 提供了一种类型安全的方法来配置 Spring容器。由于 Java 5.0 对泛型的支持，现在可以按类型而不是按名称检索 bean，不需要任何强制转换或基于字符串的查找。
## 什么是YAML?
YAML是一种人类可读的数据序列化语言。它通常用于配置文件。
与属性文件相比，如果我们想要在配置文件中添加复杂的属性，YAML文件就更加结构化，而且更少混淆。可以看出YAML具有分层配置数据。
## bootstrap.yml和application.yml有什么区别?
1、Spring Cloud 构建于 Spring Boot 之上，在 Spring Boot 中有两种上下文，一种是 bootstrap，另外一种是 application。
2、application 配置文件这个容易理解，主要用于 Spring Boot 项目的自动化配置。
3、bootstrap 是应用程序的父上下文，也就是说 bootstrap 加载优先于 applicaton。
4、bootstrap 主要用于从额外的资源来加载配置信息，还可以在本地外部配置文件中解密属性。
5、这两个上下文共用一个环境，它是任何Spring应用程序的外部属性的来源。
6、bootstrap 里面的属性会优先加载，它们默认也不能被本地相同配置覆盖。
7、boostrap 由父 ApplicationContext 加载，比 applicaton 优先加载
8、boostrap 里面的属性不能被覆盖
## springboot常用的starter有哪些?
1、spring-boot-starter-web (嵌入tomcat和web开发需要servlet与jsp支持)
2、spring-boot-starter-data-jpa (数据库支持)
3、spring-boot-starter-data-redis (redis数据库支持)
4、spring-boot-starter-data-solr (solr搜索应用框架支持)
5、mybatis-spring-boot-starter (第三方的mybatis集成starter)
## Spring Boot 配置加载顺序?
1、properties文件
2、YAML文件
3、系统环境变量
4、命令行参数
## 如何使用Spring Boot实现异常处理?
SpringControllerAdvice提供了一种使用处理异常的非常有用的方法。通过实现一个 ControllerAdvice类，来处理控制器类抛出的所有异常。
## 如何重新加载 Spring Boot上的更改，而无需重新启动服务器？
使用DEV工具来实现。
通过这种依赖关系，可以节省任何更改，嵌入式 tomcat将重新启动。
使用Spring Boot有一个开发工具Dev Tools模块，可以重新加载 Spring Boot上的更改，而无需重新启动服务器。消除每次手动部署更改的需要。Spring Boot在发布它的第一个版本时没有这个功能。该模块将在生产环境中被禁用。它还提供H2数据库控制台以更好地测试应用程序。
## Spring Boot中的监视器是什么?
Spring boot actuatorspring是启动框架中的重要功能之一。Spring boot监视器可访问生产环境中正在运行的应用程序的当前状态。有几个指标必须在生产环境中进行检查和监控。即使一些外部应用程序可能正在使用这些服务来向相关人员触发警报消息。监视器模块公开了一组可直接作为 http url rest访问的REST端点来检查状态。
## 如何在自定义端口上运行 Spring Boot应用程序?
在 application.properties中指定端口serverport=8090。
## Spring Boot监听器流程?
1、通过app.addListeners注册进入
2、初始化一个SpringApplicationRunListeners进行处理
3、从spring.factories中读取监听器处理类EventPublishingRunListener
4、通过createSpringFactoriesInstances创建监听器处理类实例
5、调用监听器listeners.starting()的方法来启动。
6、底层把事件处理交给线程池去处理
## Spring Boot初始化环境变量流程?
1、调用prepareEnvironment方法去设置环境变量
2、接下来有三个方法getOrCreateEnvironment，configureEnvironment，environmentPrepared
3、getOrCreateEnvironment去初始化系统环境变量
4、configureEnvironment去初始化命令行参数
5、environmentPrepared当广播到来的时候调用onApplicationEnvironmentPreparedEvent方法去使用postProcessEnvironment方法load yml和properties变量
## Spring Boot扫描流程?
1、调用run方法中的refreshContext方法
2、用AbstractApplicationContext中的refresh方法
3、委托给invokeBeanFactoryPostProcessors去处理调用链
4、其中一个方法postProcessBeanDefinitionRegistry会去调用processConfigBeanDefinitions解析beandefinitions
5、在processConfigBeanDefinitions中有一个parse方法，其中有componentScanParser.parse的方法，这个方法会扫描当前路径下所有Component组件
## 如何在 Spring Boot中禁用 Actuator端点安全性?
默认情况下，所有敏感的HTTP端点都是安全的，只有具有 http ACTUATOR角色的用户才能访问它们。安全性是使用标准的 httpservletrequest. isuserinrole..isusernrole方法实施的。可以使用 management. security. enabled= false来禁用安全性。只有在执行机构端点在防火墙后访问时，才建议禁用安全性。
## 如何实现 Spring Boot应用程序的安全性?
使用 spring--startersecurityboot--依赖项，并且必须添加安全配置。配置类将必须扩展 WebSecurityConfigurerAdapter并覆盖其方法。
## 什么是 Spring Batch?
Spring Boot Batch提供可重用的函数，这些函数在处理大量记录时非常重要；包括日志/跟踪，事务管理，作业处理统计信息，作业重新启动，跳过和资源管理。它还提供了更先进的技术服务和功能，通过优化和分区技术，可以实现极高批量和高性能批处理作业。简单以及复杂的大批量批处理作业可以高度可扩展的方式利用框架处理重要大量的信息。
## Spring Boot 有哪几种读取配置的方式？
@PropertySource
@Value
@Environment
@ConfigurationPropertie

# Spring Cloud
## SpringBoot和SpringCloud的区别？
SpringBoot专注于快速方便的开发单个个体微服务。

SpringCloud是关注全局的微服务协调整理治理框架，它将SpringBoot开发的一个个单体微服务整合并管理起来，为各个微服务之间提供，配置管理、服务发现、断路器、路由、微代理、事件总线、全局锁、决策竞选、分布式会话等等集成服务SpringBoot可以离开SpringCloud独立使用开发项目，但是SpringCloud离不开SpringBoot ，属于依赖的关系.
SpringBoot专注于快速、方便的开发单个微服务个体，SpringCloud关注全局的治理框架
## Spring Cloud
Spring Cloud 就是微服务系统架构的一站式解决方案，在平时我们构建微服务的过程中需要做如 服务发现注册 、配置中心 、消息总线 、负载均衡 、断路器 、数据监控 等操作，而 Spring Cloud 为我们提供了一套简易的编程模型，使我们能在 Spring Boot 的基础上轻松地实现微服务项目的构建。
## Spring Cloud 的服务发现框架——Eureka (Zookeeper)
服务发现：其实就是一个“中介”，整个过程中有三个角色：服务提供者(出租房子的)、服务消费者(租客)、服务中介(房屋中介)。

服务提供者： 就是提供一些自己能够执行的一些服务给外界。

服务消费者： 就是需要使用一些服务的“用户”。

服务中介： 其实就是服务提供者和服务消费者之间的“桥梁”，服务提供者可以把自己注册到服务中介那里，而服务消费者如需要消费一些服务(使用一些功能)就可以在服务中介中寻找注册在服务中介的服务提供者。

服务注册 Register：

官方解释：当 Eureka 客户端向 Eureka Server 注册时，它提供自身的元数据，比如IP地址、端口，运行状况指示符URL，主页等。

结合中介理解：房东 (提供者 Eureka Client Provider)在中介 (服务器 Eureka Server) 那里登记房屋的信息，比如面积，价格，地段等等(元数据 metaData)。

服务续约 Renew：

官方解释：Eureka 客户会每隔30秒(默认情况下)发送一次心跳来续约。
## RestTemplate是Spring提供的一个访问Http服务的客户端类
## 为什么需要 Ribbon？
Ribbon 是 Netflix 公司的一个开源的负载均衡 项目，是一个客户端/进程内负载均衡器，运行在消费者端。
提到 负载均衡 就不得不提到大名鼎鼎的 Nignx 了，而和 Ribbon 不同的是，它是一种集中式的负载均衡器。

Ribbon 的几种负载均衡算法
负载均衡，不管 Nginx 还是 Ribbon 都需要其算法的支持，如果我没记错的话 Nginx 使用的是 轮询和加权轮询算法。而在 Ribbon 中有更多的负载均衡调度算法，其默认是使用的 RoundRobinRule 轮询策略。

RoundRobinRule：轮询策略。Ribbon 默认采用的策略。若经过一轮轮询没有找到可用的 provider，其最多轮询 10 轮。若最终还没有找到，则返回 null。
RandomRule: 随机策略，从所有可用的 provider 中随机选择一个。
RetryRule: 重试策略。先按照 RoundRobinRule 策略获取 provider，若获取失败，则在指定的时限内重试。默认的时限为 500 毫秒。
## Open Feign
映射 呀，就像域名和IP地址的映射。我们可以将被调用的服务代码映射到消费者端，这样我们就可以 “无缝开发”啦。
## Hystrix之熔断和降级
Hystrix 就是一个能进行 熔断 和 降级 的库，通过使用它能提高整个系统的弹性。
## 微服务网关——Zuul
Zuul 就是这样的一个对于 消费者 的统一入口。Router
Zuul 的路由功能
## Spring Cloud配置管理——Config
Spring Cloud Config 就是能将各个 应用/系统/模块 的配置文件存放到 统一的地方然后进行管理(Git 或者 SVN)。
## Spring Cloud Bus 
作用就是管理和广播分布式系统中的消息，也就是消息引擎系统中的广播模式。当然作为 消息总线 的 Spring Cloud Bus 可以做很多事而不仅仅是客户端的配置刷新功能。

# idea maven下载包太慢了如何解决
在pom.xml中添加maven 依赖包时，我就发现不管是否用了翻墙，下载速度都好慢，就1M的东西能下半天，很是苦恼，于是到网上搜资料，然后让我查到了。说是使用阿里的maven镜像就可以了。我于是亲自试了下，速度快的飞起！！！

操作步骤：

1、右键项目选中maven选项，然后选择“open settings.xml”或者 “create settings.xml”

2、然后把如下代码粘贴进去就可以了。重启IDE，感受速度飞起来的感觉吧！！！
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
    <mirrors>
        <!-- mirror
         | Specifies a repository mirror site to use instead of a given repository. The repository that
         | this mirror serves has an ID that matches the mirrorOf element of this mirror. IDs are used
         | for inheritance and direct lookup purposes, and must be unique across the set of mirrors.
         |
        <mirror>
          <id>mirrorId</id>
          <mirrorOf>repositoryId</mirrorOf>
          <name>Human Readable Name for this Mirror.</name>
          <url>http://my.repository.com/repo/path</url>
        </mirror>
         -->
 
        <mirror>
            <id>alimaven</id>
            <name>aliyun maven</name>
            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
 
        <mirror>
            <id>uk</id>
            <mirrorOf>central</mirrorOf>
            <name>Human Readable Name for this Mirror.</name>
            <url>http://uk.maven.org/maven2/</url>
        </mirror>
 
        <mirror>
            <id>CN</id>
            <name>OSChina Central</name>
            <url>http://maven.oschina.net/content/groups/public/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
 
        <mirror>
            <id>nexus</id>
            <name>internal nexus repository</name>
            <!-- <url>http://192.168.1.100:8081/nexus/content/groups/public/</url>-->
            <url>http://repo.maven.apache.org/maven2</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
 
    </mirrors>
</settings>