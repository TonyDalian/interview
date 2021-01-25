# Machine Learning
## Machine Learning Concept
https://machinelearningmastery.com/basic-concepts-in-machine-learning/
https://machinelearningmastery.com/a-tour-of-machine-learning-algorithms/

##### Q: Have you heared Machine Learning? 
A: I've learned Machine Learning in IBM internal online training, 
   In IBM every year as an employee you need learn online course at lease 40 hours, 
   I studied the Machine Learning course last year.

##### Q: Some familiarity with basic machine learning concepts
such as dimensionality reduction and clustering(聚类) algorithms(算法)
A: Clustering(聚类) methods and dimensionality reduction(降维)
both seek and exploit(开发) the inherent(固有的) structure in the data

##### Q: What is Machine Learning?
Machine Learning is getting computers to program themselves. 
If programming is automation, then machine learning is automating the process of automation.

Machine learning is the way to make programming scalable.

Traditional Programming:
Data and program is run on the computer to produce the output.
Machine Learning: 
Data and output is run on the computer to create a program. This program can be used in traditional programming.
## Applications of Machine Learning
Self-driving Cars, Language Processing 
Robotics, Web search, E-commerce, Finance, Space exploration, Social networks
## Steps 
1. Import the Data
2. Clean the Data
3. Split the Data into Training/Test Sets
4. Create a Model
5. Train the Model
6. Make Predictions
7. Evaluate and Improve
## Libraries
1. Numpy
2. Pandas
3. MatPlotLib
4. Scikit-Learn
## Enveriment
Jupyter  
shortcut 
Edit Mode green 
Command Mode blue
## Platform
Anaconda
## Import Data Set
Kaggle
## Experience with data analysis (like with R or Python)

why Python?
- a good general-purpose language
- libbraries for data analysis (eg. matplotlib)
- many company already use it

why Matplotlib
- one of the most popular
- other libaries base on it
  + for example, seaborn
- easy to get started with it

install Anaconda
online editor jupyter data visualization with python
from matplotlib import pyplot as plt

x = [1,2,3];
y = [1,4,9];
plt.plot(x, y)
plt.title("title")
plt.xlabel("x")
plt.ylabel("y")
plt.legend("")
plt.show()

df = pd.read_csv('')
df.shape
df.describe()
df.values
df.drop()
type(df)
print('hello')
文件名后缀ipynb

##### learning and predict
from sklearn.tree import DecisionTreeClassifier
algorithm
model = DecisionTreeClassifier()
model.fit()
model.predict()
##### calculating the accuracy
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
##### model persist
from sklearn.externals import joblib
joblib.dump(model, 'name')
joblib.load()
##### visulization decisiontree
from sklearn import tree
tree.export_graphviz

Plot Series legend xlabel ylabel

## Key Elements of Machine Learning
Representation Evaluation Optimization

## Types of Learning
There are four types of machine learning:
1. Supervised learning 
2. Unsupervised learning 
3. Semi-supervised learning 
4. Reinforcement learning

# Work experiment with could platform (AWS, Azure etc.)
heroku

https://aws.amazon.com/cn/getting-started/hands-on/host-static-website/
clone the code from github 

Amplify
https://aws.amazon.com/cn/amplify/console/
