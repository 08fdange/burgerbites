Rails.application.routes.draw do
  resources :reviews
  resources :ratings
  resources :users
  post 'auth/register', to: 'users#register'
  post 'auth/login', to: 'users#login'
  get 'test', to: 'users#test'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
