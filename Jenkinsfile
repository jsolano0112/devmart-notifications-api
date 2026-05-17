pipeline {
    agent any

    environment {
        IMAGE_NAME        = 'notifications-api'
        WEBSOCKET_IMAGE   = 'websocket-service'
        COMPOSE_SERVICES  = 'notifications-api-1 notifications-api-2 websocket-1 websocket-2'
        REMOTE_DEPLOY_DIR = '/opt/devmart'
        COMPOSE_FILE      = 'docker-compose.prod.yml'
        DEVMART_EC2_HOST  = credentials('DEVMART_EC2_HOST')
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Instalar dependencias') {
            steps {
                bat 'npm ci || npm install'
            }
        }

        stage('Construir imagenes Docker') {
            steps {
                bat '''
                    docker build -t %IMAGE_NAME%:latest .
                    docker build -t %WEBSOCKET_IMAGE%:latest .
                '''
            }
        }

        stage('Desplegar en EC2') {
            steps {
                sshagent(credentials: ['DEVMART_EC2_SSH']) {
                    bat '''
                        docker save %IMAGE_NAME%:latest -o notifications.tar
                        docker save %WEBSOCKET_IMAGE%:latest -o websocket.tar
                        scp -o StrictHostKeyChecking=no notifications.tar websocket.tar ubuntu@%DEVMART_EC2_HOST%:/tmp/
                        ssh -o StrictHostKeyChecking=no ubuntu@%DEVMART_EC2_HOST% "docker load -i /tmp/notifications.tar && docker load -i /tmp/websocket.tar && rm -f /tmp/notifications.tar /tmp/websocket.tar"
                        ssh -o StrictHostKeyChecking=no ubuntu@%DEVMART_EC2_HOST% "cd %REMOTE_DEPLOY_DIR% && docker compose -f %COMPOSE_FILE% up -d --no-deps %COMPOSE_SERVICES%"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'notifications-api y websocket desplegados en EC2.'
        }
        failure {
            echo 'Error en pipeline notifications.'
        }
    }
}
