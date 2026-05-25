pipeline {

    agent any

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['qa', 'prod'],
            description: 'Ambiente de despliegue'
        )
    }

    environment {
        IMAGE_NAME = 'jsolano0112/notifications-api'
    }

    stages {

        stage('Build') {

            steps {

                bat '''
                    docker build ^
                    -t %IMAGE_NAME%:%BUILD_NUMBER% ^
                    -t %IMAGE_NAME%:latest ^
                    .
                '''
            }
        }

        stage('Push') {

            steps {

                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {

                    bat '''
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS%

                        docker push %IMAGE_NAME%:%BUILD_NUMBER%

                        docker push %IMAGE_NAME%:latest

                        docker logout
                    '''
                }
            }
        }

        stage('Limpiar') {
            steps {
                bat 'docker rmi %IMAGE_NAME%:%BUILD_NUMBER% 2>nul & exit /b 0'
            }
        }
        
        stage('Deploy') {

            steps {

                script {

                    def EC2_HOST = ''

                    if (params.ENVIRONMENT == 'qa') {
                        EC2_HOST = credentials('qa-ec2-ip')
                    } else {
                        EC2_HOST = credentials('prod-ec2-ip')
                    }

                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'devmart-ssh-key',
                            keyFileVariable: 'SSH_KEY'
                        )
                    ]) {

                        bat """
                            ssh -o StrictHostKeyChecking=no ^
                            -i "%SSH_KEY%" ^
                            ubuntu@${EC2_HOST} ^
                            "cd /home/ubuntu/devmart-infra && docker compose pull && docker compose up -d"
                        """
                    }
                }
            }
        }
        
    }

    
    post {
        success { echo '✅ notifications-api desplegado en EC2' }
        failure { echo '❌ Falló el pipeline' }
    }
}