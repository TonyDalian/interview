# Express
## dependency
npm i express cors body-parser mongodb 
nodemon --dev
## script
"start": "node sever/index.js"
"dev": "nodemon server/index.js"
## Middleware
```js
app.use(bodyParser.json())
app.use(cors())

app.listen(port)
reqiure lib
```
## router get post delete
```js
express.Router()
// static server
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

router.get('/', (req, res)=> {
    res.send()
})
router.post('/', async (req, res)=> {
    const posts = loadfromdb()
    await posts.insertOne()
    res.status.(201).send() // a resource has been created 
})
router.delete('/:id',  (req, res)=> {
    deleteOne({_id: mongodb.ObjectID})
    res.status.(200).send()
})
```
## handle production
```js
if(process.env.NODE_ENV === 'production'){
    // Static folder
    app.use(express.static(__dirname + '/public'))
    //handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
```
## JWT sign verify
```js
    let payload = {subject: registeredUser._id}
    let token = jwt.sign(payload, 'secretKey')
    function verifyToken(req, res, next) {
        if(!req.headers.authorization) {
            return res.status(401).send('Unauthorized request')
        }
        let token = req.headers.authorization.split(' ')[1]
        if(token === 'null') {
            return res.status(401).send('Unauthorized request')    
        }
        let payload = jwt.verify(token, 'secretKey')
        if(!payload) {
            return res.status(401).send('Unauthorized request')    
        }
        req.userId = payload.subject
        next()
    }

    router.get('/special', verifyToken, (req, res) => {})
```


# Python
更接近 plain english, function : colon , indent 
## variable
```python
age = 20
print(age) 
is_online = False
```
## string
```python
course = 'Python for beginners'
print('Python' in course)
```
## input
```python
birth_year = input("What is your birth year?")
print("Hello" + name)
```
## type conversion
type conversion float() int() str() bool()
```python
age = 2020 -int(birth_year)
```
## logical operator
```python
print(not price > 10) 
and or not
```
## if esle
```python
if tem > 30:
    print("")
elif tem > 20
    print(""):
else:
    print(""):
print("done")
```
## Exercise
```python
weight = int(input("Weight: "))
unit = input("(K)g or (L)bs: ")
if unit.upper() == "K":
    converted = weight / 0.45
    print("Weight in Lbs: " + str(converted))
else:
    converted = weight * 0.45
    print("Weight in Kgs: " + str(converted))
```
## while loop
```python
i = 1
while i<=10:
  print(i* '*')
  i = i + 1
```
## lists
```python
names = ["Jone", "Bob", "Mosh"]
print(names)
print(names[-1])
print(names[0:3]) 原始lists不会改变

numbers = [1,2,3,4]
numbers.insert(5)
numbers.insert(0, -1)
number.remove(3)
number.clear()
print(i in numbers) True or False
print(len(numbers))
```
## foo loops
```
for item in numbers: 
    print(item)
```
## rang() function
```
numbers = rang(5,10,2) 
// 5 7 9
for item in numbers: 
    print(item)
```
## Tuples 不可变
```python
number = (1,2,3)
number.count(3)
number.idex()
```

# Django
## install python django
1. python3 --version
2. pip3 install pipenv
3. PYTHON_BIN_PATH="$(python3 -m site --user-base)/bin" PATH="$PATH:$PYTHON_BIN_PATH"
##### start django 
4. pipenv shell  # exit
5. pipenv install django djangorestframework django-rest-knox
6. django-admin startproject leadmanager
7. python manage.py startapp leads
8. python manage.py makemigrations leads
9. python manage.py migrate
###### Serve API on localhost:8000
10. python leadmanager/manage.py runserver
## setting.py 
INSTALLED_APPS
MIDDLEWARE
TEMPLATES
DATABASES
AUTH_PASSWORD_VALIDATORS
## urls.py (Router)
```python
from . import views

app_name = 'polls'
urlpatterns = [
    path('', views.index, name='index'),
    path('<int:question_id>/', views.detail, name='detail'),
    path('<int:question_id>/results/', views.results, name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote')
]
```
## Model
```python
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def __str__(self):
        return self.question_text


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.choice_text
```
## DB shell
python manage.py shell
## Template (View)
## Views (Controller)
```python
    from .models import Question, Choice
    # Get questions and display them
    def index(request):
        latest_question_list = Question.objects.order_by('-pub_date')[:5]
        context = {'latest_question_list': latest_question_list}
        return render(request, 'polls/index.html', context)

    # Show specific question and choices
    def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, 'polls/detail.html', { 'question': question })
```

# Work experience with non-relational databases (MongoDB, DynamoDB, or other)
## Cloud Mongo
https://cloud.mongodb.com/v2/5ff04d0a86e4ab652ac57dec#clusters/commandLineTools/Cluster0
mLab mongoose Schema
Mongodb.MongoClient client.db
table --- collection 
async await find() insertOne()
##### Connect to cloud mongo
Comment Line : mongo "mongodb+srv://cluster0.gnvew.mongodb.net/eventsdb" --username litao8976
##### mongodb_cheat_sheet.md
https://gist.github.com/litao8976/db01d15d0907e01d19cb9938834ea321
##### show tables
show collections
##### Get All Rows
```sql
db.posts.find() db.find().pretty() db.posts.find().limit(2).pretty() 
db.posts.findOne({ category: 'News' })
Insert Row
db.posts.insert({})
Insert Multiple Rows
db.posts.insertMany([])
```
## Postgres
pip install psycopg2-binary pg_ctl -D /usr/local/var/postgres start

##### start to use lunch Postgres
postgres-cheatsheet.md https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546

psql postgres
1. create role app_user with login password 'app_password';
2. alter role app_user createdb;
3. \du #list users 
   \q #Quit/Exit
##### login 
4. psql postgres -U app_user 
5. create database app_database;
6. \connect app_database;
7. \dt #show tables
8. select * from leads_lead;

# Ruby
## puts print
```ruby
name = "Tony"
puts "Your name is " + name
puts "Your name is #{name}"
```
## String
```ruby
greeting = "hello"

puts greeting.length
puts greeting[0]
puts greeting.include? "llo"
puts greeting[1,3]
```
## gets
```ruby
puts "Enter a value"
name = gets.chomp
puts "Your name is #{name}"

first_num = gets.to_i
```
## Array
```ruby
numbers = [4,8,'12',16]
puts numbers[-1] 最后一个
puts numbers[2,3] 
puts numbers[2..4] 
puts numbers.length

number.reverse //无参数没括号
```
## function
```ruby
def add_numbers(num1, num2=99)
    return num1 + num2
end

sum = add_numbers(4, 3)
puts sum
```
## if else condition
```ruby
is_student = false
if is_student and is_smart
   puts "You are student"
elsif

end
//or !
case when else
```
## dictionary
```ruby
test_grades = {
    "Andy" => "B+",
    :Stanley => "C",
    3 => 96.2
}

test_grades["Andy"] = "B-"
```
## while loops
```ruby
index = 1
while index <=5
   puts index
   index += 1
end
```
## for loop 
```ruby
for index in 0..5     
  puts index
end

5.times do |index|
  puts index
end

nums = [2, 4, 8]
for num in nums
   puts num
end

nums.each do |num|
   puts num
end
```
## exception catching
```ruby
#num = 10/0 注解#
begin 
  num = 10/0 
rescue ZeroDivisionError
  puts "Error"
end 

raise "Made up exception"
```
## class object
```ruby
class Book
    attr_accessor :title, :author
    #constructor
    def initialize(title, author)
        self.title = title
        @author = author
    end
    #getter
    def title=(title)
        puts "Set"
        @title = title
    end
    #setter
    def title
        puts "Get"
        return @title
    end
    def readBook()
        puts "Reading #{self.title} by #{self.author}"
    end
end

book1 = Book.new()
book1.title = "Horry Potter"
book1.author = "JK Rowing"

book1 = Book.new("Horry Potter", "JK Rowing")

book1.readBook()
puts book1.title
```
## Inheritance
```ruby
class Chef
    attr_accessor :name, :age
    def initialize(name, age)
         @name = name
         @age = age
    end
    dev make_chicken()
        puts "The chef makes chicken"
    end
    dev make_special_dish()
        puts "The chef makes a special dish"
    end
end 
class ItalianChef < Chef
    attr_accessor :country
    def initialize(name, age, country)
         @country = country
         super(name, age)
    end
    def make_pasta()
        puts "The chef makes make_pasta"
    end
    dev make_special_dish()
        puts "The chef makes a chicken parm"
    end
end

my_chef = Chef.new()
my_chef.make_chicken()

my_italian_chef = ItalianChef.new()
my_italian_chef.make_chicken()
my_italian_chef.make_special_dish()
```

# Ruby OnRails
## install Ruby OnRails
https://gorails.com/setup/osx/11.0-big-sur#ruby
1. Install Homebrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
2. Install Ruby
brew install rbenv ruby-build
##### Add rbenv to bash so that it loads every time you open a terminal
echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.zshrc
source ~/.zshrc
##### Install Ruby
rbenv install 2.7.0
rbenv global 2.7.0
ruby -v
3. Installing Rails
gem install rails -v 6.1.0
rbenv rehash
rails -v
###### ERROR! -> export GEM_HOME="$HOME/.gem"
4. create a new app
rails new myOnRailApp -d postgresql
bundle install
##### ERRPR! bundle install 
$ gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
$ gem sources -l
$ bundle config mirror.https://rubygems.org https://gems.ruby-china.com
5. Create the database
rake db:create
Created database 'myOnRailsApp_development'
Created database 'myOnRailsApp_test'
##### ERROR! Webpacker configuration file not found /myOnRailsApp/config/webpacker.yml. Please run rails webpacker:install
https://github.com/rails/webpacker/blob/master/lib/install/config/webpacker.yml
## Ruby OnRails New project
1. Create project
rails new react-for-rails --webpack=react -d=postgresql
rails new myarticle --api
2. folder structure
folder name app
## Controller
rails g controller pages
```ruby
class PagesController < ApplicationController
    http_basic_authenticate_with name:"Tony", password:"", except:[:index, :show]
    def index
    end

    def about
        @title = 'About us'
        redirect_to post_path(@post)
    end
    def show
        article = Article.find(params[:id])
        render json: {status: 'SUCCESS', message:'Loaded article', data:article},status: :ok
    end
    def create
        article = Article.new(article_params)

        if article.save
          render json: {status: 'SUCCESS', message:'Saved article', data:article},status: :ok
        else
          render json: {status: 'ERROR', message:'Article not saved', data:article.errors},status: :unprocessable_entity
        end
    end
    def update
        article = Article.find(params[:id])
        if article.update_attributes(article_params)
          render json: {status: 'SUCCESS', message:'Updated article', data:article},status: :ok
        else
          render json: {status: 'ERROR', message:'Article not updated', data:article.errors},status: :unprocessable_entity
    end
    def destroy
    end
    def article_params
        params.permit(:title, :body)
    end
end
```
views helper coffee scss
## config/routers
https://guides.rubyonrails.org/routing.html
```ruby
Rails.application.routes.draw do
  # root
  root 'pages#index', as: 'home' 指向views/{pages}/index.html.erb
  # regular router
  get 'about' => 'pages#about', as: 'about'  指向views/{pages}/about.html.erb
  post 'search', to 'currencies#search'
  # resource router 
  # CRUT index create new edit show update(put patch) destroy
  resources :posts do
    resources :comments
  end
  // show all routes
  rake routes
end
```
## React 
javascript/packs/index.jsx
javascript/src
## Views
views/layouts/application.html.erb
```ruby
    <head>
    <%= javascript_pack_tag 'index' %>
    </head>
    <body>
     <%= yield %>
    </body>

views/{pages}/about.html.erb
<h1><%= @title %></h1>
<%= form_for :post, url:post_path(@post), method: :patch do |f| >
<% @post.comments.each do |comment>
```
## Model
rails g model Post name:string descrption slug
```ruby
class Article < ApplicationRecord
  has_many :comments
  validates :title, presence: true
  validates :body, presence: true
end

class Airline < ApplicationRecord
  has_many :reviews

  validates :name, presence: true, length: { maximum: 255 }

  # Slugify airline name into a url safe param before create
  # Ex: 'United Airlines'.parameterize => 'united-airlines'
  before_create -> (airline) do
    airline.slug = airline.name.parameterize
  end

  # Get the average score of all reviews for an airline
  def calculate_average
    return 0 unless reviews.size.positive?

    avg = reviews.average(:score).to_f.round(2) * 100
    update_column(:average_score, avg)
  end
end
```
## config/database.yml change database
## DB migrate 
rake db:migrate db:rollback
## init data
db/migrate/seeds.rb
db:seed
## rail console
Currency.count
Currency.first

# difference between Django and OnRails
##### Django 有admin 一个project 包括多个apps
Rails model 不需要import 
##### 外键
Django models.ForeignKey
OnRails has_many :comments
##### pages 
OnRails 自动映射
Django render()