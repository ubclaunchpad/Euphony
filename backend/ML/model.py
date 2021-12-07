import torch
from torch import nn
import os

weights_save_path = "model_weights/model_weights.pth"

class NeuralNetwork(nn.Module):
    def __init__(self):
        super(NeuralNetwork, self).__init__()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(34, 512), # should be (40,512), removing 5 moods + 1 location atm
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 13) # 4 categorical
        )

    def forward(self, x):
        logits = self.linear_relu_stack(x)
        return logits

def load_model():
    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = NeuralNetwork().to(device)
    
    if os.path.exists(weights_save_path):
        model.load_state_dict(torch.load(weights_save_path))
        model.eval()

    return model