from model import load_model
import torch
import pandas as pd
from sklearn.model_selection import train_test_split

feature_save_path = "final_dataset/features.csv"
target_save_path = "final_dataset/targets.csv"
weights_save_path = "model_weights/model_weights.pth"
TRAIN_VAL_LOSS_SCALING = 1.2

def main():

    model = load_model()
    model.train()

    feature_data = pd.read_csv(feature_save_path)
    feature_data = torch.FloatTensor(feature_data.values)

    target_data = pd.read_csv(target_save_path)
    target_data = torch.FloatTensor(target_data.values)

    X_train, X_test, y_train, y_test = train_test_split(feature_data, target_data, test_size=0.05, random_state=42)

    learning_rate = 0.0001
    epochs = 10000

    loss = torch.nn.MSELoss()
    optimizer = torch.optim.SGD(model.parameters(), lr=learning_rate)

    # 3) Training loop
    for epoch in range(epochs):
        # predict = forward pass with our model
        predictions = model(X_train)

        # loss
        l = loss(y_train, predictions)

        # calculate gradients = backward pass
        l.backward()

        # update weights
        optimizer.step()

        # zero the gradients after updating
        optimizer.zero_grad()

        if epoch%50 == 0:
            train_loss = l.item()
            print(f"Train Loss: {train_loss}")
            val_predictions = model(X_test)
            l = loss(y_test, val_predictions)
            val_loss = l.item()
            print(f"Val Loss: {val_loss}")

            if train_loss * TRAIN_VAL_LOSS_SCALING < val_loss:
                print(f"early stopping epoch: {epoch}")
                break
            
    torch.save(model.state_dict(), weights_save_path)



if __name__ == '__main__':
    main()