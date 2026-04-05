pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install') {
            steps {
                script {
                    if (isUnix()) { sh 'npm ci' } else { bat 'npm ci' }
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    if (isUnix()) { sh 'npm run lint' } else { bat 'npm run lint' }
                }
            }
        }

        stage('Build TypeScript') {
            steps {
                script {
                    if (isUnix()) { sh 'npm run build' } else { bat 'npm run build' }
                }
            }
        }

        stage('Build Docker') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'docker build -t notifications-api .'
                    } else {
                        bat 'docker build -t notifications-api .'
                    }
                }
            }
        }
    }

    post {
        success { echo '✅ notifications-api OK' }
        failure { echo '❌ notifications-api falló' }
        always { cleanWs() }
    }
}