pipeline {
    agent any

    environment {
        IMAGE_NAME = 'notifications-api'
        WEBSOCKET_IMAGE = 'websocket-service'
        COMPOSE_DIR = 'C:\\Users\\LENOVO\\Desktop\\electiva 3' 
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

        stage('Construir Imágenes Docker') {
            steps {
                echo 'Construyendo imágenes notifications-api y websocket-service...'
                script {
                    if (isUnix()) {
                        sh """
                            docker build -t ${IMAGE_NAME}:latest .
                            docker build -t ${WEBSOCKET_IMAGE}:latest .
                        """
                    } else {
                        bat """
                            docker build -t %IMAGE_NAME%:latest .
                            docker build -t %WEBSOCKET_IMAGE%:latest .
                        """
                    }
                }
            }
        }

        stage('Desplegar Contenedores') {
            steps {
                echo 'Desplegando notifications y websocket...'
                script {
                    if (isUnix()) {
                        sh """
                            cd "${COMPOSE_DIR}"
                            docker compose --env-file ./notifications/.env up -d --no-deps --force-recreate \
                                notifications-api-1 notifications-api-2 \
                                websocket-1 websocket-2
                        """
                    } else {
                        bat """
                            cd "%COMPOSE_DIR%"
                            docker compose --env-file ./notifications/.env up -d --no-deps --force-recreate notifications-api-1 notifications-api-2 websocket-1 websocket-2
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'notifications-api y websocket desplegados correctamente'
        }
        failure {
            echo 'Error al desplegar notifications'
        }
    }
}