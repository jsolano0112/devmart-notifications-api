pipeline {
    agent any

    environment {
        IMAGE_NAME = 'notifications-api'
    }

    stages {
        stage('Instalar Dependencias') {
            steps {
                echo 'Instalando dependencias...'
                script {
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                echo 'Construyendo imagen Docker...'
                script {
                    if (isUnix()) {
                        sh "docker build -t ${IMAGE_NAME}:latest ."
                    } else {
                        bat "docker build -t %IMAGE_NAME%:latest ."
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Imagen notifications-api construida correctamente'
        }
        failure {
            echo 'Error al construir la imagen'
        }
    }
}