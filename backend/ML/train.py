from model import load_model
import torch
import numpy as np
import pandas as pd

feature_save_path = "processed_data/feature_rainy_workout.csv"
target_save_path = "processed_data/target_rainy_workout.csv"
weights_save_path = "model_weights/model_weights.pth"

def main():

    model = load_model()
    model.train()

    feature_data = pd.read_csv(feature_save_path)
    feature_data = torch.FloatTensor(feature_data.values)

    target_data = pd.read_csv(target_save_path)
    target_data = torch.FloatTensor(target_data.values)

    learning_rate = 0.0001
    epochs = 1000

    loss = torch.nn.MSELoss()
    optimizer = torch.optim.SGD(model.parameters(), lr=learning_rate)

    # 3) Training loop
    for epoch in range(epochs):
        # predict = forward pass with our model
        predictions = model(feature_data)

        # loss
        l = loss(target_data, predictions)

        # calculate gradients = backward pass
        l.backward()

        # update weights
        optimizer.step()

        # zero the gradients after updating
        optimizer.zero_grad()

        if epoch%10 == 0:
            print(l.item())

    torch.save(model.state_dict(), weights_save_path)



if __name__ == '__main__':
    main()