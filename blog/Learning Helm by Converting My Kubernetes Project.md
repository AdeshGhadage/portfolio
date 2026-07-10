# **Learning Helm by Converting My Kubernetes Project** 

When I decided to learn Helm, I didn't want another "Deploy NGINX using Helm" tutorial.

I already had a Kubernetes project—a chat application with three components:

* Frontend  
* Backend  
* MongoDB

Instead of creating a new demo application, I asked myself a simple question:

**How would I convert an existing Kubernetes project into a production-ready Helm chart?**

This approach helped me understand not only *how* Helm works, but *why* it exists.

---

# **My Initial Misconception**

Initially, I thought Helm was simply a way to avoid writing YAML repeatedly.

I imagined that one Deployment template could generate Deployments for the backend, frontend, and MongoDB.

After studying more, I realized that's not the real purpose of Helm.

Helm is **not about reducing the number of YAML files**.

It is about making Kubernetes applications:

* Configurable  
* Reusable  
* Versioned  
* Easy to upgrade and rollback

---

# **The First Question I Learned to Ask**

Before writing any Helm template, I now ask:

**What changes between environments?**

For example, in my backend Deployment:

* Replica count changes  
* Image tag changes  
* Secrets change  
* Database URI changes

These belong in `values.yaml`.

Things like:

* `kind: Deployment`  
* `apiVersion`  
* `spec.template`  
* Labels structure

don't usually change.

Those stay inside the template.

That completely changed how I approached Helm.

---

# **Designing `values.yaml`**

One of the biggest lessons I learned is that you **don't start by writing `values.yaml`.**

Instead, you discover it.

I opened my Kubernetes Deployment and highlighted everything that might change.

Eventually my configuration naturally became something like:

backend:  
  replicaCount: 2

  image:  
    repository: chat-backend  
    tag: latest

  service:  
    port: 5000

The template simply reads these values.

replicas: {{ .Values.backend.replicaCount }}

image: "{{ .Values.backend.image.repository }}:{{ .Values.backend.image.tag }}"

Helm wasn't introducing anything magical.

It was simply replacing hardcoded values with configurable ones.

---

# **Understanding `.Values`, `.Release`, and `.Chart`**

This was one of the most confusing parts initially.

Eventually it clicked.

### **`.Values`**

Everything inside `values.yaml`.

Example:

backend:  
  replicaCount: 2

Accessed as:

{{ .Values.backend.replicaCount }}

---

### **`.Release.Name`**

This **doesn't come from `values.yaml`.**

It comes from the install command.

helm install chat-app .

Now

{{ .Release.Name }}

becomes

chat-app

If I install the same chart again:

helm install production .

it becomes

production

This allows the same chart to be installed multiple times.

---

### **`.Chart.Name`**

This comes from `Chart.yaml`.

name: chat-app

Then

{{ .Chart.Name }}

renders to

chat-app

---

# **Why I Didn't Use One Deployment Template**

Initially I wanted one Deployment template for everything.

Then I compared my resources.

Backend has:

* Environment variables  
* JWT Secret  
* Mongo URI

Frontend doesn't.

MongoDB has:

* Storage  
* Volume mounts

Backend doesn't.

Trying to merge all of them into one template would require many conditional statements and make the chart harder to maintain.

So I kept separate templates.

* backend-deployment.yaml  
* frontend-deployment.yaml  
* mongodb-deployment.yaml

The templates remain separate.

Only the configurable values move into `values.yaml`.

That felt much cleaner.

---

# **Understanding Service Types**

While converting the Services, I finally understood why Kubernetes has different Service types.

### **ClusterIP**

Accessible only inside the cluster.

Perfect for:

* Backend APIs  
* MongoDB  
* Internal services

---

### **NodePort**

Exposes the application through:

NodeIP:Port

Useful for local development.

---

### **LoadBalancer**

Creates a cloud load balancer on providers like AWS, Azure, or GCP.

Ideal for production applications that need public access.

---

For my project I decided:

* Frontend → NodePort (during local development)  
* Backend → ClusterIP  
* MongoDB → ClusterIP

---

# **Helm Isn't Just a Template Engine**

Another realization was that Helm behaves much like a package manager.

Initially my chart looked like:

templates/

backend  
frontend  
mongodb

Later I learned about dependencies.

Instead of maintaining my own MongoDB chart forever, I can depend on an existing chart maintained by the community.

For example:

dependencies:  
  \- name: mongodb  
    repository: ...

Then Helm downloads the dependency automatically.

This raised another question:

How do I know what configuration options the MongoDB chart supports?

The answer surprised me.

You don't invent them.

You use **the API designed by the chart author**.

The chart's `values.yaml` becomes its public configuration interface.

That was a big mindset shift.

When writing my own chart, I design the configuration.

When using someone else's chart, I consume the configuration they've already designed.

---

# **The Development Workflow I Ended Up Following**

Instead of immediately deploying every change, I started using this workflow.

helm lint chat-app/

helm template my-release chat-app/

helm install my-release chat-app/

`helm lint` checks the chart.

`helm template` shows the generated Kubernetes manifests.

Only after those looked correct did I install the chart.

This made debugging much easier.

---

# **My Biggest Takeaway**

The biggest lesson wasn't Helm syntax.

It was learning to think differently.

Instead of asking:

How do I convert Kubernetes YAML into Helm?

I now ask:

* Which values change?  
* Which values should stay fixed?  
* What should be configurable?  
* What should Helm generate automatically?  
* Am I designing a good configuration API?

That shift in thinking made Helm much easier to understand.

---

# **What's Next**

Next, I plan to:

* Deploy the chart on a local Kubernetes cluster using Kind.  
* Learn helper templates (`_helpers.tpl`).  
* Replace my custom MongoDB chart with the Bitnami MongoDB dependency.  
* Explore chart versioning and packaging.  
* Learn Helm upgrades and rollbacks in a real environment.

I'm still learning, but converting a real project instead of following a toy example made Helm finally click for me.

