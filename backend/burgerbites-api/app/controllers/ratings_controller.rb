class RatingsController < ApplicationController
    skip_before_action :authenticate_request, only: %i[login register show index]

    def register
        @user = User.new(user_params)
        if @user.save
            response = { message: "User created successfully"}
            render json: response, status: :created
        else
            render json: @user.errors, status: :bad
        end
    end

    def login
        authenticate params[:email], params[:password]
      end
      
    def test
        render json: {
            message: 'You have passed authentication and authorization test'
        }
    end

    def show
        @user = User.find(params[:id])
        render json: @user
    end

    def index
        @users = User.all 
        render json: @users
    end

    private
        def authenticate(email, password)
            command = AuthenticateUser.call(email, password)
    
            if command.success?
                render json: {
                access_token: command.result,
                message: 'Login Successful'
            }
            else
                render json: { error: command.errors }, status: :unauthorized
            end
        end

        def user_params
            # params.require(:user).
            params.permit(:email, :password)
        end
end
